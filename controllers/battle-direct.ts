import { TYPES } from "../types"
import { IRoute } from "./handlers"
import { inject, injectable } from "inversify"
import { IWebSocket } from "../api/socket/server"
import { Rooms } from "../api/socket/socket/rooms"
import { MemberService } from "../services/member.service"
import { TBattleDirectAPI, TEventBattleDirect } from "../common-types/socket/client-to-server"
import { TBombPayload, TFirePayload } from "../common-types/socket/server-to-client"
import { ArenaService } from "../services/arena.service"
import { Member } from "../entities/arena/arena-team-member"

@injectable()
class BattleDirectHandler extends IRoute {
    @inject(TYPES.Rooms) private _rooms!: Rooms
    @inject(TYPES.MemberService) private _memberService!: MemberService
    @inject(TYPES.ArenaService) private _arenaService!: ArenaService

    public static EVENT: TEventBattleDirect = "battleDirect"

    async handle(
        message: TBattleDirectAPI,
        uSocket: IWebSocket,
    ) {

        console.log('BattleDirectHandler handle')

        const _member = await this._memberService.getById(message.payload.userId)

        if (_member.health < 1) {
            return
        }

        _member.pos = message.payload.position

        const arena = await this._arenaService.getById(_member.arena)

        const bounds = arena.place.bounds

        if (
            _member.pos[0] < bounds[0][0] || _member.pos[1] < bounds[0][1] ||
            _member.pos[0] > bounds[1][0] || _member.pos[1] > bounds[1][1]
        ) {

            if (Math.random() > 0.6) {

                const bomb: TBombPayload = {
                    position: message.payload.position,
                    userId: message.payload.userId,
                    bomb: {
                        symbol: 'aerial',
                        level: 1
                    }
                }

                this._rooms.arenas.broadcast(_member.arena, {
                    event: 'bomb',
                    payload: bomb
                })

                const health = _member.removeHealth(10)

                if (health < 1) {

                    const killPointerTeam = arena.killPointer(_member.userId, _member.arenaTeam)
                    await this._arenaService.update(arena)

                    _member.leaveArena()

                    if (killPointerTeam.alive_members === 0) {

                        console.log('КРЫНДЕЦ!')

                        setTimeout(async () => {

                            const members: Member[][] = []

                            members[0] = await this._memberService.getByIds(arena.teamList[0].members)
                            members[1] = await this._memberService.getByIds(arena.teamList[1].members)

                            this._rooms.arenas.broadcast(arena.id, {
                                event: 'battle-over',
                                payload: {
                                    teams: arena.teamList.map((team, index) => {
                                        const minTrophies = team.status === 'victory' ? 10 : -10
                                        return {
                                            teamId: team.id,
                                            status: team.status,
                                            members: members[index].map(member => {
                                                const wonTrophies = member.damage / 5
                                                return {
                                                    userId: member.userId,
                                                    trophies: minTrophies + wonTrophies
                                                }
                                            }),
                                        }
                                    })
                                }
                            })

                        }, 2000)

                    }

                }
            }
        }
        
        this._memberService.update(_member)

        this._rooms.arenas.broadcast(_member.arena, {
            event: 'direct',
            payload: {
                userId: message.payload.userId,
                pos: message.payload.position
            }
        }, _member.userId)

    }
}

// DirectHandler.EVENT = "direct"

export {
    BattleDirectHandler
}