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
class BattleDirectHandler extends IRoute {
    @inject(TYPES.PointerService) private _pointerService!: PointerService
    @inject(TYPES.PointerMemoryRepository) private _repository!: IPointerRepository
    @inject(TYPES.Rooms) private _rooms!: Rooms

    public static EVENT: TEventDirect = "battle-direct"

    async handle(
        message: TDirectAPI,
        uSocket: IWebSocket,
    ) {

        console.log('BattleDirectHandler handle')

        const _pointer = await this._pointerService.getById(message.payload.userId)

        if (_pointer.health < 1) {
            return
        }

        _pointer.pos = message.payload.position
        this._pointerService.update(_pointer)

        this._rooms.sectors.broadcast(_pointer.arena, {
            event: 'direct',
            payload: {
                userId: message.payload.userId,
                pos: message.payload.position
            }
        }, _pointer.userId)



    }
}

// DirectHandler.EVENT = "direct"

export {
    BattleDirectHandler
}