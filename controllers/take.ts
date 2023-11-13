import { TCitadel, TFindCont, TNewZone, TTakeHit, TTakeHitPayload, TTakePayload, TTakeSectorPayload } from "../common-types/socket/server-to-client"
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

        const zone = await this._zoneService.getById(uSocket.user_id)

        if(zone.stormtrooper_corps.invaders < 1) {
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
            _sector = await this._sectorService.getById(message.payload.sector)
            console.log('____________1')

        } catch (e) {

            console.log('____________2')

            _sector = this._sectorService.create({
                id: message.payload.sector,
                latlng: message.payload.fort,
                zone_id: 0,
                defenders: 5
            })

        }

        const status = _sector.invade(zone.id)

        takeHit = {
            status,
            fort: message.payload.fort,
            invaders: _sector.invaders,
            defenders: _sector.defenders,
            owner: _sector.zone_id
        } as TTakeHitPayload

        // Если я победил
        if (status === 'victory') {

            if (_sector.zone_id) {
                const _prevZone = await this._zoneService.getById(_sector.zone_id)
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

                // Убираем один сектор у пред-го владельца
                // if (prevZoneId) _prevZone.terrain.loseSector()

                const tempLevel = zone.terrain.level
                const sectsAndLevel = zone.terrain.addSector()

                if(sectsAndLevel.level > tempLevel) {
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
                    sector_id: message.payload.sector
                } as TTakeSectorPayload

                // Обновляем владельца сектор
                _sector.setOwner(_pointer.zoneId)

                isBooty = Sector.probabilityGettingExtractionInFort(message.payload.fort)
                console.log('take isBooty', isBooty)

                if (zone.terrain.sectors === 1) {

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

        // if (0) {

        //     _sector.addDefender()

        //     takeHit = {
        //         status: 'defense',
        //         invaders: 0,
        //         fort: message.payload.fort,
        //         defenders: _sector.defenders
        //     } as TTakeHitPayload

        //     takeSector = {
        //         new_owner_id: _pointer.zoneId,
        //         prev_owner_id: 0,
        //         sector_id: message.payload.sector
        //     } as TTakeSectorPayload

        //     this._logs.takes.add(_sector.id)

        //     zone.terrain.newDefender()
        //     zone.terrain.addSector()

        //     if (zone.terrain.sectors === 1) {

        //         const citadel = this._citadelService.create({
        //             id: _pointer.zoneId,
        //             sectorId: _sector.id,
        //             latlng: _sector.latlng
        //         })
        //         this._citadelService.baseInsert(citadel)

        //         const payload: TCitadel = {
        //             id: citadel.id,
        //             latlng: citadel.latlng,
        //             level: citadel.level
        //         }

        //         setTimeout(() => {
        //             uSocket.send(JSON.stringify({
        //                 event: 'set-citadel',
        //                 payload: payload
        //             }))
        //         }, 2000)

        //     }
        // }

        this._zoneService.memoryUpdate(zone)
        this._pointerService.memoryUpdate(_pointer)

        // takeHit.fort = message.payload.fort

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
                            fort: message.payload.fort,
                            cont: container
                        }
                    }
                    uSocket.send(JSON.stringify(resp))
                }

                // Отправляем себе
                uSocket.send(JSON.stringify({
                    event: 'y-take-sector',
                    payload: takeSector
                }))

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

            } else {
                uSocket.send(JSON.stringify(takeHitResp))
            }
        }, 2000)

        this._sectorService.memoryInsert(_sector)

        const take: TTakePayload = {
            position: _pointer.pos,
            fort: message.payload.fort,
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