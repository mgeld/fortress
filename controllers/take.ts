import { TCitadel, TSetCitadel, TTakeHitPayload, TTakePayload, TTakeSectorPayload } from "../common-types/socket/server-to-client"
import { TEventFire, TTakeAPI } from "../common-types/socket/client-to-server"
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

@injectable()
class TakeHandler extends IRoute {
    @inject(TYPES.Rooms) private _rooms!: Rooms
    @inject(TYPES.PointerService) private _pointerService!: PointerService
    @inject(TYPES.ZoneService) private _zoneService!: ZoneService
    @inject(TYPES.SectorService) private _sectorService!: SectorService
    @inject(TYPES.CitadelService) private _citadelService!: CitadelService
    @inject(TYPES.Logs) private _logs!: Logs

    public static EVENT: TEventFire = "fire"

    async handle(
        message: TTakeAPI,
        uSocket: IWebSocket,
    ) {
        console.log('TakeHandler handle')

        const _pointer = await this._pointerService.memoryGetById(message.payload.userId)
        _pointer.killInvader()

        let _sector: Sector
        let _invaders: number = 0

        let takeHit: TTakeHitPayload = {} as TTakeHitPayload
        let takeSector: TTakeSectorPayload | null = null

        try {
            _sector = await this._sectorService.getById(message.payload.sector)

            const status = _sector.invade(
                _pointer.id,
                _pointer.invaders
            )

            takeHit = {
                status,
                invaders: _sector.invaders,
                defenders: _sector.defenders
            } as TTakeHitPayload

            // Если я победил и на секторе больше нет защитников
            if (status === 'victory' && _sector.defenders === 0) {

                const _prevZone = await this._zoneService.getById(_sector.user_id)
                _prevZone.loseSector()
                this._zoneService.memoryInsert(_prevZone)

                takeSector = {
                    new_owner_id: _pointer.id,
                    prev_owner_id: _sector.user_id,
                    sector_id: message.payload.sector
                } as TTakeSectorPayload

                _sector.setOwner(_pointer.id)

                const pointerZone = await this._zoneService.getById(_pointer.id)
                pointerZone.addSector()
                this._zoneService.memoryInsert(pointerZone)
                
                console.log('pointerZone.sectors', pointerZone.sectors)

                if (pointerZone.sectors === 1) {
                    const citadel = this._citadelService.create({
                        id: _pointer.id,
                        sectorId: _sector.id,
                        latlng: _sector.latlng
                    })
                    this._citadelService.baseInsert(citadel)

                    const payload: TCitadel = {
                        id: citadel.id,
                        latlng: citadel.latlng,
                        level: citadel.level
                    }

                    uSocket.send(JSON.stringify({
                        event: 'set-citadel',
                        payload: payload
                    }))
                }

            }

            this._logs.takes.add(_sector.id)
            this._sectorService.update(_sector)

        } catch (e) {

            _sector = this._sectorService.create({
                id: message.payload.sector,
                latlng: message.payload.fort,
                user_id: _pointer.id,
                defenders: 0
            })

            _sector.addDefender()

            takeHit = {
                status: 'defense',
                invaders: 0,
                defenders: _sector.defenders
            } as TTakeHitPayload

            takeSector = {
                new_owner_id: _pointer.id,
                prev_owner_id: 0,
                sector_id: message.payload.sector
            } as TTakeSectorPayload

            this._logs.takes.add(_sector.id)
            this._sectorService.memoryInsert(_sector)

            const pointerZone = await this._zoneService.getById(_pointer.id)

            console.log('2 pointerZone.sectors', pointerZone.sectors)
            pointerZone.addSector()
            this._zoneService.memoryInsert(pointerZone)

            if (pointerZone.sectors === 1) {
                const citadel = this._citadelService.create({
                    id: _pointer.id,
                    sectorId: _sector.id,
                    latlng: _sector.latlng
                })
                this._citadelService.baseInsert(citadel)

                const payload: TCitadel = {
                    id: citadel.id,
                    latlng: citadel.latlng,
                    level: citadel.level
                }

                uSocket.send(JSON.stringify({
                    event: 'set-citadel',
                    payload: payload
                }))

            }
        }

        this._pointerService.memoryUpdate(_pointer)

        takeHit.fort = message.payload.fort

        setTimeout(() => {
            uSocket.send(JSON.stringify({
                event: 'take-hit',
                payload: takeHit
            }))

            if (takeSector)
                this._rooms.areals.broadcast(_pointer.areal, {
                    event: 'take-sector',
                    payload: takeSector
                })
        }, 2000)

        const take: TTakePayload = {
            position: message.payload.position,
            fort: message.payload.fort,
            userId: message.payload.userId,
        }

        this._rooms.areals.broadcast(_pointer.areal, {
            event: 'take',
            payload: take
        }, _pointer.id)

    }
}

// TakeHandler.EVENT = 'take'

export {
    TakeHandler
}