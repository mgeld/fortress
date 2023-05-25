import { inject, injectable } from "inversify"
import { TDirectAPI, TEventDirect } from "../common-types/socket/client-to-server"
import { PointerService } from "../services/pointer.service"
import { TYPES } from "../types"
import { IWebSocket } from "../api/socket/server";
import { IRoute } from "./handlers"
import { Rooms } from "../api/socket/socket/rooms"
import { Sector } from "../entities/pointer/sector"
import { IPointerRepository } from "../entities/repository"

@injectable()
class DirectHandler extends IRoute {
    @inject(TYPES.PointerService) private _pointerService!: PointerService
    @inject(TYPES.PointerMemoryRepository) private _repository!: IPointerRepository
    @inject(TYPES.Rooms) private _rooms!: Rooms

    public static EVENT: TEventDirect = "direct"

    async handle(
        message: TDirectAPI,
        uSocket: IWebSocket,
    ) {

        console.log('DirectHandler handle')

        const _pointer = await this._pointerService.getById(message.payload.userId)

        if(_pointer.health < 1) {
            return
        }

        _pointer.pos = message.payload.position

        if (message.payload?.arena) {
            this._rooms.sectors.broadcast(_pointer.arena, {
                event: 'direct',
                payload: {
                    userId: message.payload.userId,
                    pos: message.payload.position
                }
            }, _pointer.userId)

        } else {

            const sector = Sector.generator(message.payload.position)

            if (_pointer.sector && _pointer.sector === sector) {

                this._rooms.sectors.broadcast(_pointer.sector, {
                    event: 'direct',
                    payload: {
                        userId: message.payload.userId,
                        pos: message.payload.position
                    }
                }, _pointer.userId)

            } else {

                if (_pointer.sector) {
                    this._rooms.sectors.deleteClient(_pointer.userId, _pointer.sector)

                    this._rooms.sectors.broadcast(_pointer.sector, {
                        event: 'del-pointer',
                        payload: {
                            userId: _pointer.userId
                        }
                    })
                }

                _pointer.sector = sector

                this._rooms.sectors.addClientToRoom(_pointer.userId, _pointer.sector, uSocket)

                const clients = this._rooms.sectors.getClients(_pointer.sector).filter(p => p !== _pointer.userId)
                const pointers = await this._repository.getByIds(clients)

                uSocket.send(JSON.stringify({
                    event: 'pointers',
                    payload: {
                        pointers: pointers.map(pointer => pointer.unmarshal())
                    }
                }))

                this._rooms.sectors.broadcast(_pointer.sector, {
                    event: 'connect-pointer',
                    payload: {
                        health: _pointer.health,
                        userId: message.payload.userId,
                        pos: message.payload.position
                    }
                }, _pointer.userId)

            }

        }

        this._pointerService.update(_pointer)

    }
}

// DirectHandler.EVENT = "direct"

export {
    DirectHandler
}