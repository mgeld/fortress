
import { inject, injectable } from "inversify";

import { IWebSocket } from "../api/socket/server";
import { Rooms } from "../api/socket/socket/rooms";
import { TBattleJoinAPI, TEventBattleJoin } from "../common-types/socket/client-to-server";
import { Member } from "../entities/arena/arena-team-member";
import { MemberPlace } from "../entities/arena/member-place";
import { ArenaService } from "../services/arena.service";
import { MemberService } from "../services/member.service";

import { TYPES } from "../types";
import { IRoute } from "./handlers";
import { PointerService } from "../services/pointer.service";

@injectable()
class BattleJoinHandler extends IRoute {
    @inject(TYPES.Rooms) private _rooms!: Rooms
    @inject(TYPES.ArenaService) private _arenaService!: ArenaService
    @inject(TYPES.PointerService) private _pointerService!: PointerService
    @inject(TYPES.MemberService) private _memberService!: MemberService

    public static EVENT: TEventBattleJoin = "battleJoin"

    async handle(
        message: TBattleJoinAPI,
        uSocket: IWebSocket,
    ) {

        console.log('BattleJoinHandler handle')

        if (!uSocket.user_id) return

        const arena = await this._arenaService.getArena()

        const team = arena.addPointer(uSocket.user_id)

        const teamPlace = team.getPlace(arena.place.place)

        const _member = Member.create({
            userId: uSocket.user_id,
            pos: MemberPlace.generate(teamPlace, team.getMembersNumber()),
            // health: 100,
            arena: arena.id,
            arenaTeam: team.id
        })
        const member = await this._memberService.insert(_member)

        const roomId = this._rooms.arenas.getRoom(arena.id)
        this._rooms.arenas.addClientToRoom(uSocket.user_id, roomId, uSocket)

        const roomValues = Object.values(this._rooms.arenas.getClients(roomId))
        console.log('roomValuesJoin', roomValues)

        uSocket.send(JSON.stringify({
            event: 'battle-join',
            payload: {
                user: {
                    pos: _member.pos,
                    // health: _member.health,
                },
            }
        }))

        if (arena.isFullTeams()) {

            console.log('ISFULL TEAMS!!!!!!!!!!!!!')

            arena.battleStart()

            const members = await this._memberService.getByIds(arena.pointers)
            const pointers = await this._pointerService.getByIds(arena.pointers)

            const users: Record<number, {
                lvl: number
                icon: string
                name: string
                health: number
            }> = {}

            pointers.forEach(pointer => {
                users[pointer.zoneId] = {
                    lvl: pointer.level,
                    icon: pointer.icon,
                    name: pointer.name,
                    health: pointer.health,
                }
            })

            this._rooms.arenas.broadcast(roomId, {
                event: 'battle-start',
                payload: {
                    battleId: arena.id,
                    place: arena.place.place,
                    timeStart: +new Date(),
                    teams: arena.teamList.map(team => ({
                        teamId: team.id,
                        status: team.status,
                        members: team.members.map(member => ({
                            userId: member,
                            trophies: 0
                        })),
                    })),
                    pointers: members.map(member => {
                        const memb = member.pointerUnmarshal()
                        return {
                            ...memb,
                            ...users[member.userId]
                        }
                    })
                }
            })

        }

        await this._arenaService.update(arena)

    }
}

// BattleHandler.EVENT = "battle"

export {
    BattleJoinHandler
}