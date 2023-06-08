import { inject, injectable } from "inversify"
import { TDirectAPI, TEventDirect } from "../common-types/socket/client-to-server"
import { PointerService } from "../services/pointer.service"
import { TYPES } from "../types"
import { IWebSocket } from "../api/socket/server";
import { IRoute } from "./handlers"
import { Rooms } from "../api/socket/socket/rooms"
import { Areal } from "../entities/pointer/areal"
import { IPointerRepository } from "../entities/repository"

@injectable()
class DirectHandler extends IRoute {
    @inject(TYPES.Rooms) private _rooms!: Rooms
    @inject(TYPES.PointerService) private _pointerService!: PointerService
    @inject(TYPES.PointerMemoryRepository) private _repository!: IPointerRepository

    public static EVENT: TEventDirect = "direct"

    async handle(
        message: TDirectAPI,
        uSocket: IWebSocket,
    ) {

        console.log('DirectHandler handle')

        const _pointer = await this._pointerService.getById(message.payload.userId)

        if (_pointer.health < 1) {
            return
        }

        _pointer.pos = message.payload.position

        const areal = Areal.generator(message.payload.position)

        if (_pointer.areal && _pointer.areal === areal) {

            this._rooms.areals.broadcast(_pointer.areal, {
                event: 'direct',
                payload: {
                    userId: message.payload.userId,
                    pos: message.payload.position
                }
            }, _pointer.userId)

        } else {

            if (_pointer.areal) {
                this._rooms.areals.deleteClient(_pointer.userId, _pointer.areal)

                this._rooms.areals.broadcast(_pointer.areal, {
                    event: 'del-pointer',
                    payload: {
                        userId: _pointer.userId
                    }
                })
            }

            _pointer.areal = areal

            this._rooms.areals.addClientToRoom(_pointer.userId, _pointer.areal, uSocket)

            const clients = this._rooms.areals.getClients(_pointer.areal).filter(p => p !== _pointer.userId)
            const pointers = await this._repository.getByIds(clients)

            uSocket.send(JSON.stringify({
                event: 'pointers',
                payload: {
                    pointers: pointers.map(pointer => pointer.unmarshal())
                }
            }))

            this._rooms.areals.broadcast(_pointer.areal, {
                event: 'connect-pointer',
                payload: {
                    health: _pointer.health,
                    userId: message.payload.userId,
                    pos: message.payload.position
                }
            }, _pointer.userId)

        }


        this._pointerService.update(_pointer)

    }
}

// DirectHandler.EVENT = "direct"

export {
    DirectHandler
}