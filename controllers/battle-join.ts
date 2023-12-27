
import { inject, injectable } from "inversify";

import { IWebSocket } from "../api/socket/server";
import { Rooms } from "../api/socket/socket/rooms";
import { ArenaService } from "../services/arena.service";
import { MemberService } from "../services/member.service";
import { Member } from "../entities/arena/arena-team-member";
import { MemberPlace } from "../entities/arena/member-place";
import { TBattleJoinAPI, TEventBattleJoin } from "../common-types/socket/client-to-server";

import { TYPES } from "../types";
import { IRoute } from "./handlers";
import { TZoneColor } from "../common-types/model";
import { BattleService } from "../services/battle.service";
import { PointerService } from "../services/pointer.service";

@injectable()
class BattleJoinHandler extends IRoute {
    @inject(TYPES.Rooms) private _rooms!: Rooms
    @inject(TYPES.ArenaService) private _arenaService!: ArenaService
    @inject(TYPES.MemberService) private _memberService!: MemberService
    @inject(TYPES.BattleService) private _battleService!: BattleService
    @inject(TYPES.PointerService) private _pointerService!: PointerService

    public static EVENT: TEventBattleJoin = "battleJoin"

    async handle(
        message: TBattleJoinAPI,
        uSocket: IWebSocket,
    ) {

        console.log('BattleJoinHandler handle')

        if (!uSocket.user_id) return

        const _pointer = await this._pointerService.memoryGetById(uSocket.user_id)

        // Если игрок уже на Арене или ищет противника
        // Такого через игру не будет, но могут отправить запросы, чтобы найти уязы
        if (_pointer.areal === -1) return
        
        if (_pointer.health < 1) return

        const arena = await this._arenaService.getArena()

        console.log('BattleJoinHandler arena.id', arena.id)

        const team = arena.addPointer(uSocket.user_id)
        const teamPlace = team.getPlace(arena.place.place)

        const _member = Member.create({
            userId: uSocket.user_id,
            pos: MemberPlace.generate(teamPlace, team.getMembersNumber()),
            arena: arena.id,
            arenaTeam: team.id
        })
        const member = await this._memberService.insert(_member)

        const roomId = this._rooms.arenas.getRoom(arena.id)
        this._rooms.arenas.addClientToRoom(uSocket.user_id, roomId, uSocket)

        // const roomValues = Object.values(this._rooms.arenas.getClients(roomId))

        uSocket.send(JSON.stringify({
            event: 'battle-join',
            payload: {
                user: {
                    pos: _member.pos,
                    team: _member.arenaTeam,
                },
            }
        }))

        // Удаляем клиента из ареала, т.к. он добавлен на арену
        this._rooms.areals.deleteClient(_pointer.zoneId, _pointer.areal)
        this._rooms.areals.broadcast(_pointer.areal, {
            event: 'del-pointer',
            payload: {
                userId: _pointer.zoneId
            }
        }, [_pointer.zoneId])

        _pointer.areal = -1
        await this._pointerService.memoryUpdate(_pointer)

        if (arena.isFullTeams()) {

            console.log('ISFULL TEAMS !!!!!!!!!!!!!')

            arena.battleStart()

            const members = await this._memberService.getByIds(arena.pointers)

            const users: Record<number, {
                lvl: number
                icon: string
                name: string
                health: number
                color: TZoneColor
            }> = await this._pointerService.getMarshalPointers(arena.pointers)

            this._rooms.arenas.broadcast(roomId, {
                event: 'battle-start',
                payload: {
                    battleId: arena.id,
                    place: arena.place.place,
                    timeStart: +new Date(),
                    teams: arena.teamList.map(team => ({
                        teamId: team.id,
                        status: team.status,
                        sectors: team.sectors,
                        members: team.members.map(member => ({
                            userId: member,
                            trophies: 0,
                            coins: 0
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

            arena.timeout = setTimeout(() => this._battleService.overGame(arena.id), 120000)

        }

        await this._arenaService.update(arena)

    }
}

// BattleHandler.EVENT = "battle"

export {
    BattleJoinHandler
}