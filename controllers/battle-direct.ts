import { TYPES } from "../types"
import { IRoute } from "./handlers"
import { inject, injectable } from "inversify"
import { IWebSocket } from "../api/socket/server"
import { Rooms } from "../api/socket/socket/rooms"
import { MemberService } from "../services/member.service"
import { TBombPayload } from "../common-types/socket/server-to-client"
import { ArenaService } from "../services/arena.service"
import { PointerService } from "../services/pointer.service"
import { BattleService } from "../services/battle.service"
import { TBattleDirectAPI, TEventBattleDirect } from "../common-types/socket/client-to-server"

@injectable()
class BattleDirectHandler extends IRoute {
    @inject(TYPES.Rooms) private _rooms!: Rooms
    @inject(TYPES.ArenaService) private _arenaService!: ArenaService
    @inject(TYPES.MemberService) private _memberService!: MemberService
    @inject(TYPES.PointerService) private _pointerService!: PointerService
    @inject(TYPES.BattleService) private _battleService!: BattleService

    public static EVENT: TEventBattleDirect = "battleDirect"

    async handle(
        message: TBattleDirectAPI,
        uSocket: IWebSocket,
    ) {

        if (!uSocket.user_id) return

        const pos = message.payload?.position

        if(!pos) return

        const _pointer = await this._pointerService.memoryGetById(uSocket.user_id)
        const _member = await this._memberService.getById(_pointer.zoneId)

        // if (_member.health < 1) {
        //     return
        // }

        _member.pos = pos

        const arena = await this._arenaService.getById(_member.arena)

        const bounds = arena.place.bounds

        if (
            _member.pos[0] < bounds[0][0] || _member.pos[1] < bounds[0][1] ||
            _member.pos[0] > bounds[1][0] || _member.pos[1] > bounds[1][1]
        ) {

            if (Math.random() > 0.6) {

                const health = _pointer.removeHealth(10)
                await this._pointerService.memoryUpdate(_pointer)

                const bomb: TBombPayload = {
                    position: pos,
                    userId: _pointer.zoneId,
                    health,
                    bomb: {
                        symbol: 'aerial',
                        level: 1
                    }
                }

                this._rooms.arenas.broadcast(_member.arena, {
                    event: 'bomb',
                    payload: bomb
                })

                if (health < 1) {

                    const killPointerTeam = arena.killPointer(_member.userId, _member.arenaTeam)

                    // _member.leaveArena()

                    if (killPointerTeam.alive_members === 0) {

                        arena.completeBattle(killPointerTeam.id)

                        await this._arenaService.update(arena)

                        this._battleService.overGame(arena.id)

                    } else {
                        await this._arenaService.update(arena)
                    }


                }
            }
        }

        this._memberService.update(_member)

        this._rooms.arenas.broadcast(_member.arena, {
            event: 'direct',
            payload: {
                userId: _pointer.zoneId,
                pos: pos
            }
        }, [_member.userId])

    }
}

// DirectHandler.EVENT = "direct"

export {
    BattleDirectHandler
}