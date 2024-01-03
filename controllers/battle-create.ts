
import { inject, injectable } from "inversify";

import { IWebSocket } from "../api/socket/server";
import { ArenaService } from "../services/arena.service";
import { TBattleCreateAPI, TEventBattleCreate } from "../common-types/socket/client-to-server";

import { TYPES } from "../types";
import { IRoute } from "./handlers";
import { PointerService } from "../services/pointer.service";

@injectable()
class BattleCreateHandler extends IRoute {
    @inject(TYPES.ArenaService) private _arenaService!: ArenaService
    @inject(TYPES.PointerService) private _pointerService!: PointerService

    public static EVENT: TEventBattleCreate = "battleCreate"

    async handle(
        message: TBattleCreateAPI,
        uSocket: IWebSocket,
    ) {

        if (!uSocket.user_id) return

        const _pointer = await this._pointerService.memoryGetById(uSocket.user_id)

        // Если игрок уже на Арене или ищет противника
        // Такого через игру не будет, но могут отправить запросы, чтобы найти уязы
        if (_pointer.areal === -1) return

        const arena = await this._arenaService._create('private')

        uSocket.send(JSON.stringify({
            event: 'battle-id',
            payload: {
                id: arena.id
            }
        }))

    }
}

// BattleHandler.EVENT = "battle"

export {
    BattleCreateHandler
}