import { TCitadel, TFindCont, TNewRank, TNewZone, TTakeHit, TTakeHitPayload, TTakePayload, TTakeSectorPayload } from "../common-types/socket/server-to-client"
import { TEventTake, TTakeAPI } from "../common-types/socket/client-to-server"
import { IWebSocket } from "../api/socket/server";
import { IRoute } from "./handlers"
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { Rooms } from "../api/socket/socket/rooms";
import { PointerService } from "../services/pointer.service";
import { SectorService } from "../services/sector.service";
import { Sector } from "../entities/sector/sector";
import { Logs } from "../infra/logs/takes";
import { ZoneService } from "../services/zone.service";
import { CitadelService } from "../services/citadel.service";
import { TFindContType } from "../common-types/model";
import { Zone } from "../entities/zone/zone";
import { Rank } from "../entities/zone/rank";

@injectable()
class TakeHandler extends IRoute {

    @inject(TYPES.Rooms) private _rooms!: Rooms

    @inject(TYPES.PointerService) private _pointerService!: PointerService
    @inject(TYPES.ZoneService) private _zoneService!: ZoneService
    @inject(TYPES.SectorService) private _sectorService!: SectorService
    @inject(TYPES.CitadelService) private _citadelService!: CitadelService

    @inject(TYPES.Logs) private _logs!: Logs

    public static EVENT: TEventTake = "take"

    async handle(
        message: TTakeAPI,
        uSocket: IWebSocket,
    ) {
        console.log('TakeHandler handle')

        if (!uSocket.user_id) return

        const __fort = message.payload?.fort
        const __sector = message.payload?.sector

        if (!__fort || !__sector) return

        const zone = await this._zoneService.getById(uSocket.user_id)

        if (zone.stormtrooper_corps.invaders < 1) {
            return
        }

        let _sector: Sector
        let prevZoneId: number = 0

        let takeHit: TTakeHitPayload = {} as TTakeHitPayload
        let takeSector: TTakeSectorPayload | null = null

        let isBooty = false

        const _pointer = await this._pointerService.memoryGetById(uSocket.user_id)

        zone.stormtrooper_corps.storm()

        try {
            _sector = await this._sectorService.getById(__sector)
        } catch (e) {
            _sector = this._sectorService.create({
                id: __sector,
                latlng: __fort,
                zone_id: 0,
                defenders: 5
            })
        }

        let _prevZone: Zone | null = null
        if (_sector.zone_id) {
            _prevZone = await this._zoneService.getById(_sector.zone_id)
        }

        const invPower = zone.stormtrooper_corps.power
        const defPower = _prevZone ? _prevZone.stormtrooper_corps.power : invPower / 2

        const status = _sector.invade(
            zone.id,
            invPower,
            defPower
        )

        takeHit = {
            status,
            fort: __fort,
            invaders: _sector.invaders,
            defenders: _sector.defenders,
            owner: _sector.zone_id
        } as TTakeHitPayload

        // Если я победил
        if (status === 'victory') {

            // Добавляем число 2 ко временному опыту
            zone.rank.increaseExp(2)

            if (_sector.zone_id && _prevZone) {
                _prevZone.terrain.killDefender()
                prevZoneId = _prevZone.id

                if (_sector.defenders === 0) {
                    // Убираем один сектор у пред-го владельца
                    if (prevZoneId) _prevZone.terrain.loseSector()
                }
                this._zoneService.memoryUpdate(_prevZone)
            }

            zone.terrain.newDefender()

            // Если на секторе больше нет защитников
            if (_sector.defenders === 0) {

                const trophies = Math.ceil(zone.rank.tempExp / 10)
                zone.setTrophies(trophies)

                // Сохраняем временный опыт
                const [wasExp, willExp] = zone.rank.saveExp()
                if (willExp === 0) {
                    const newRank: TNewRank = {
                        event: 'new-rank',
                        payload: {
                            rank: zone.rank.rank
                        }
                    }
                    const rubies = Rank.getLevelRewardRubies(zone.rank.rank)
                    zone.addRubies(rubies)
                    setTimeout(() => uSocket.send(JSON.stringify(newRank)), 2000)
                }

                const tempLevel = zone.terrain.level
                const sectsAndLevel = zone.terrain.addSector()

                if (sectsAndLevel.level > tempLevel) {
                    const newLevel: TNewZone = {
                        event: 'new-zone',
                        payload: {
                            level: sectsAndLevel.level
                        }
                    }
                    setTimeout(() => uSocket.send(JSON.stringify(newLevel)), 5000)
                }

                takeSector = {
                    new_owner_id: _pointer.zoneId,
                    prev_owner_id: _sector.zone_id,
                    sector_id: __sector
                } as TTakeSectorPayload

                if (_sector.zone_id === 0) {
                    isBooty = Sector.probabilityGettingExtractionInFort(__fort)
                }

                // Обновляем владельца сектор
                _sector.setOwner(_pointer.zoneId)

                if (zone.terrain.sectors === 1) {

                    // Если это первый сектор, то там есть добыча по умолчанию
                    isBooty = true

                    const citadel = this._citadelService.create({
                        id: _pointer.zoneId,
                        sectorId: _sector.id,
                        latlng: _sector.latlng
                    })

                    this._citadelService.baseInsert(citadel)

                    const payload: TCitadel = {
                        id: citadel.id,
                        latlng: citadel.latlng,
                        level: citadel.level
                    }
                    setTimeout(() => {
                        uSocket.send(JSON.stringify({
                            event: 'set-citadel',
                            payload: payload
                        }))
                    }, 2000)
                }
            }


        }

        this._logs.takes.add(_sector.id)
        this._sectorService.update(_sector)

        this._zoneService.memoryUpdate(zone)
        this._pointerService.memoryUpdate(_pointer)

        const takeHitResp: TTakeHit = {
            event: 'take-hit',
            payload: {
                hit: takeHit
            }
        }

        let container: TFindContType
        if (isBooty) {
            container = _sector.generateBooty()
        }

        setTimeout(() => {
            if (takeSector) {

                if (isBooty) {
                    const resp: TFindCont = {
                        event: 'find-cont',
                        payload: {
                            fort: __fort,
                            cont: container
                        }
                    }
                    uSocket.send(JSON.stringify(resp))
                }

                // Отправляем остальным игрокам из области
                this._rooms.areals.broadcast(_pointer.areal, {
                    event: 'take-sector',
                    payload: takeSector
                }, _pointer.zoneId)

                if (prevZoneId) {
                    this._rooms.areals.clientSocket(prevZoneId, _pointer.areal, {
                        event: 'yr-take-sector',
                        payload: takeSector
                    })
                }

                takeSector.exp = zone.rank.exp
                takeSector.trp = zone.trophies

                // Отправляем себе
                uSocket.send(JSON.stringify({
                    event: 'y-take-sector',
                    payload: takeSector
                }))

            } else {
                uSocket.send(JSON.stringify(takeHitResp))
            }
        }, 2000)

        this._sectorService.memoryInsert(_sector)

        const take: TTakePayload = {
            position: _pointer.pos,
            fort: __fort,
            userId: _pointer.zoneId,
        }

        this._rooms.areals.broadcast(_pointer.areal, {
            event: 'take',
            payload: take
        }, _pointer.zoneId)

    }
}

// TakeHandler.EVENT = 'take'

export {
    TakeHandler
}