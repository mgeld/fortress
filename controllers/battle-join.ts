
import { inject, injectable } from "inversify";

import { IWebSocket } from "../api/socket/server";
import { Rooms } from "../api/socket/socket/rooms";
import { TBattleAPI, TEventBattle } from "../common-types/socket/client-to-server";
import { Member } from "../entities/arena/arena-team-member";
import { ArenaService } from "../services/arena.service";
import { PointerService } from "../services/pointer.service";

import { TYPES } from "../types";
import { IRoute } from "./handlers";

@injectable()
class BattleJoinHandler extends IRoute {
    @inject(TYPES.PointerService) private _pointerService!: PointerService
    @inject(TYPES.ArenaService) private _arenaService!: ArenaService
    @inject(TYPES.Rooms) private _rooms!: Rooms

    public static EVENT: TEventBattle = "battleJoin"

    async handle(
        message: TBattleAPI,
        uSocket: IWebSocket,
    ) {

        console.log('BattleJoinHandler handle')

        const arena = await this._arenaService.getArena()

        const pointer = await this._pointerService.getById(message.payload.userId)
        pointer.arena = arena.id

        const isAdd = arena.addPointer(Member.create({ pointerId: pointer.userId }))

        await this._pointerService.update(pointer)
        await this._arenaService.update(arena)

        const roomId = this._rooms.arenas.getRoom(arena.id)
        this._rooms.arenas.addClientToRoom(pointer.userId, roomId, uSocket)

        if (arena.isFullTeams()) {

            const pointers = await this._pointerService.getByIds(arena.pointers)

            this._rooms.arenas.broadcast(roomId, {
                event: 'battle-start',
                payload: {
                    battleId: arena.id,
                    pointers: pointers.map(pointer => pointer.unmarshal())
                }
            })

        }
    }
}

// BattleHandler.EVENT = "battle"

export {
    BattleJoinHandler
}