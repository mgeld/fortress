import { TTakeHit, TTakeHitPayload, TTakePayload, TTakeSectorPayload } from "../common-types/socket/server-to-client"
import { TEventBattleTake, TTakeAPI } from "../common-types/socket/client-to-server"
import { IWebSocket } from "../api/socket/server";
import { IRoute } from "./handlers"
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { Rooms } from "../api/socket/socket/rooms";
import { PointerService } from "../services/pointer.service";

import { ZoneService } from "../services/zone.service";
// import { TFindContType } from "../common-types/model";
import { ArenaService } from "../services/arena.service";
import { MemberService } from "../services/member.service";
import { ArenaSectorService } from "../services/arena-sector.service";
import { ArenaSector } from "../entities/arena/sector";
import { BattleService } from "../services/battle.service";

@injectable()
class BattleTakeHandler extends IRoute {

    @inject(TYPES.Rooms) private _rooms!: Rooms

    @inject(TYPES.ZoneService) private _zoneService!: ZoneService
    @inject(TYPES.ArenaService) private _arenaService!: ArenaService
    @inject(TYPES.MemberService) private _memberService!: MemberService
    @inject(TYPES.PointerService) private _pointerService!: PointerService
    @inject(TYPES.ArenaSectorService) private _sectorService!: ArenaSectorService
    @inject(TYPES.BattleService) private _battleService!: BattleService

    // @inject(TYPES.Logs) private _logs!: Logs

    public static EVENT: TEventBattleTake = "battleTake"

    async handle(
        message: TTakeAPI,
        uSocket: IWebSocket,
    ) {
        console.log('BattleTakeHandler handle')

        if (!uSocket.user_id) return

        const zone = await this._zoneService.getById(uSocket.user_id)
        const _member = await this._memberService.getById(zone.id)

        const arena = await this._arenaService.getById(_member.arena)

        if (zone.stormtrooper_corps.invaders < 1) {
            return
        }

        let _sector: ArenaSector
        let prevTeamId: number = 0

        let takeHit: TTakeHitPayload = {} as TTakeHitPayload
        let takeSector: TTakeSectorPayload | null = null

        // let isBooty = false

        const _pointer = await this._pointerService.memoryGetById(uSocket.user_id)

        zone.stormtrooper_corps.storm()

        try {
            _sector = await this._sectorService.getById(message.payload.sector)
        } catch (e) {
            _sector = this._sectorService.create({
                id: message.payload.sector,
                latlng: message.payload.fort,
                team_id: 0,
                arena: arena.id,
                defenders: 5
            })
        }

        const status = _sector.invade(_member.arenaTeam)

        takeHit = {
            status,
            fort: message.payload.fort,
            invaders: _sector.invaders,
            defenders: _sector.defenders,
            owner: _sector.team_id
        } as TTakeHitPayload

        console.log('_sector.team_id', _sector.team_id)
        console.log('1 takeHit', takeHit)

        // Если я победил
        if (status === 'victory') {

            if (_sector.team_id) {

                const _prevTeam = arena.getTeam(_sector.team_id)
                prevTeamId = _prevTeam.id

                // _prevZone.terrain.killDefender()

                // Если на секторе больше нет защитников
                if (_sector.defenders === 0) {
                    // Убираем один сектор у пред-го владельца
                    if (prevTeamId) _prevTeam.loseSector()
                }
                // this._zoneService.memoryUpdate(_prevZone)

                console.log('prevTeamId', prevTeamId)
            }

            // zone.terrain.newDefender()

            // Если на секторе больше нет защитников
            if (_sector.defenders === 0) {

                // Сохраняем в свою стату захваченный сектор
                _member.invadeSector()
                await this._memberService.update(_member)

                // Сохраняем в стату команды захваченный сектор
                const myTeam = arena.addSector(_member.arenaTeam)

                takeSector = {
                    new_owner_id: _member.arenaTeam,
                    prev_owner_id: _sector.team_id,
                    sector_id: message.payload.sector
                } as TTakeSectorPayload

                console.log('takeSector', takeSector)

                // Обновляем владельца сектор
                _sector.setOwner(_member.arenaTeam)

                // Временно закомментили получение добычи в режиме Арены
                // isBooty = Sector.probabilityGettingExtractionInFort(message.payload.fort)
                // console.log('take isBooty', isBooty)


                console.log('myTeam.sectors', myTeam.sectors)

                if (myTeam.sectors >= 5) {
                    arena.completeBattle(myTeam.id === 1 ? 2 : 1)
                    this._battleService.overGame(arena.id)
                }

            }

            await this._arenaService.update(arena)

        }

        // this._logs.takes.add(_sector.id)

        this._sectorService.update(_sector)

        this._zoneService.memoryUpdate(zone)
        this._pointerService.memoryUpdate(_pointer)

        const takeHitResp: TTakeHit = {
            event: 'take-hit',
            payload: {
                hit: takeHit
            }
        }

        // let container: TFindContType
        // if (isBooty) {
        //     container = _sector.generateBooty()
        // }

        setTimeout(() => {
            if (takeSector) {

                // if (isBooty) {
                //     const resp: TFindCont = {
                //         event: 'find-cont',
                //         payload: {
                //             fort: message.payload.fort,
                //             cont: container
                //         }
                //     }
                //     uSocket.send(JSON.stringify(resp))
                // }

                // Отправляем своей команде
                const myTeam = arena.getTeam(_member.arenaTeam)
                myTeam.members.forEach(member => {
                    if (takeSector)
                        this._rooms.arenas.clientSocket(member, _member.arena, {
                            event: 'battle-y-take-sector',
                            payload: takeSector
                        })
                })

                // Отправляем остальным игрокам из области
                // this._rooms.arenas.broadcast(_member.arena, {
                //     event: 'battle-take-sector',
                //     payload: takeSector
                // }, _pointer.zoneId)

                if (prevTeamId) {
                    const prevTeam = arena.getTeam(prevTeamId)
                    prevTeam.members.forEach(member => {
                        if (takeSector)
                            this._rooms.arenas.clientSocket(member, _member.arena, {
                                event: 'battle-yr-take-sector',
                                payload: takeSector
                            })
                    })
                } else {
                    const team = arena.getTeam(myTeam.id === 1 ? 2 : 1)
                    team.members.forEach(member => {
                        if (takeSector)
                            this._rooms.arenas.clientSocket(member, _member.arena, {
                                event: 'battle-take-sector',
                                payload: takeSector
                            })
                    })
                }

            } else {
                uSocket.send(JSON.stringify(takeHitResp))
            }
        }, 2000)

        this._sectorService.memoryInsert(_sector)

        const take: TTakePayload = {
            position: _member.pos,
            fort: message.payload.fort,
            userId: _member.userId,
        }

        console.log('arena.id', arena.id)
        console.log('_member.arena', _member.arena)

        this._rooms.arenas.broadcast(arena.id, {
            event: 'take',
            payload: take
        }, _member.userId)

    }
}

// BattleTakeHandler.EVENT = 'take'

export {
    BattleTakeHandler
}