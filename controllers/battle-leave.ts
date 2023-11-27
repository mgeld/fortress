import { inject, injectable } from "inversify";

import { IWebSocket } from "../api/socket/server";
import { Rooms } from "../api/socket/socket/rooms";
import { TBattleLeaveAPI, TEventBattleLeave } from "../common-types/socket/client-to-server";

import { ArenaService } from "../services/arena.service";
import { MemberService } from "../services/member.service";

import { TYPES } from "../types";
import { IRoute } from "./handlers";
import { PointerService } from "../services/pointer.service";

@injectable()
class BattleLeaveHandler extends IRoute {
    @inject(TYPES.Rooms) private _rooms!: Rooms
    @inject(TYPES.ArenaService) private _arenaService!: ArenaService
    @inject(TYPES.MemberService) private _memberService!: MemberService
    @inject(TYPES.PointerService) private _pointerService!: PointerService

    public static EVENT: TEventBattleLeave = "battleLeave"

    async handle(
        message: TBattleLeaveAPI,
        uSocket: IWebSocket,
    ) {
        
        console.log('BattleLeaveHandler handle')

        if (!uSocket.user_id) return
        
        const member = await this._memberService.getById(uSocket.user_id)
        const arena = await this._arenaService.getById(member.arena)

        if(arena.status !== 'pending') return

        const pointer = await this._pointerService.memoryGetById(member.userId)

        const team = arena.delPointer(member.userId, member.arenaTeam)
        this._rooms.arenas.deleteClient(member.userId, arena.id)

        this._memberService.remove(member.userId)
        
        // const roomValues = Object.values(this._rooms.arenas.getClients(arena.id))
        // console.log('roomValuesLeave', roomValues)

        uSocket.send(JSON.stringify({
            event: 'set-user',
            payload: {
                user: {
                    pos: pointer.pos,
                    health: pointer.health,
                }
            }
        }))

        await this._arenaService.update(arena)

    }
}

export {
    BattleLeaveHandler
}