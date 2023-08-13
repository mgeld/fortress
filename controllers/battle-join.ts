
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

@injectable()
class BattleJoinHandler extends IRoute {
    @inject(TYPES.Rooms) private _rooms!: Rooms
    @inject(TYPES.ArenaService) private _arenaService!: ArenaService
    @inject(TYPES.MemberService) private _memberService!: MemberService

    public static EVENT: TEventBattleJoin = "battleJoin"

    async handle(
        message: TBattleJoinAPI,
        uSocket: IWebSocket,
    ) {

        console.log('BattleJoinHandler handle')

        const arena = await this._arenaService.getArena()

        const team = arena.addPointer(message.payload.userId)

        const teamPlace = team.getPlace(arena.place.place)

        const _member = Member.create({
            userId: message.payload.userId,
            pos: MemberPlace.generate(teamPlace, team.getMembersNumber()),
            health: 100,
            arena: arena.id,
            arenaTeam: team.id
        })

        const member = await this._memberService.insert(_member)

        const roomId = this._rooms.arenas.getRoom(arena.id)
        this._rooms.arenas.addClientToRoom(message.payload.userId, roomId, uSocket)

        uSocket.send(JSON.stringify({
            event: 'battle-join',
            payload: {
                user: {
                    pos: _member.pos,
                    health: _member.health,
                },
            }
        }))

        if (arena.isFullTeams()) {

            arena.battleStart()

            const members = await this._memberService.getByIds(arena.pointers)

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
                    pointers: members
                        .map(member => member.pointerUnmarshal())
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