import { TLimit, TTractorExtr, TTutorial } from "../common-types/socket/server-to-client"
import { TBeamAPI, TEventBeam } from "../common-types/socket/client-to-server"
import { IWebSocket } from "../api/socket/server";
import { IRoute } from "./handlers"
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { Rooms } from "../api/socket/socket/rooms";
import { SectorService } from "../services/sector.service";
import { Sector } from "../entities/sector/sector";
import { Logs } from "../infra/logs/takes";
import { ZoneService } from "../services/zone.service";
import { TExtrTypes } from "../common-types/model";

@injectable()
class BeamHandler extends IRoute {

    @inject(TYPES.Rooms) private _rooms!: Rooms

    @inject(TYPES.ZoneService) private _zoneService!: ZoneService
    @inject(TYPES.SectorService) private _sectorService!: SectorService

    @inject(TYPES.Logs) private _logs!: Logs

    public static EVENT: TEventBeam = "beam"

    async handle(
        message: TBeamAPI,
        uSocket: IWebSocket,
    ) {
        console.log('BeamHandler handle')

        if (!uSocket.user_id) return

        const __fort = message.payload?.fort
        const __sector = message.payload?.sector
        const __position = message.payload?.position

        if (!__fort || !__sector || !__position) return

        let _sector: Sector

        const zone = await this._zoneService.getById(uSocket.user_id)

        let extrResp: TTractorExtr

        try {
            _sector = await this._sectorService.getById(__sector)

            let extr: TExtrTypes | null = null

            console.log('_sector.booty', _sector.booty)

            if (_sector.booty) {

                if (zone.terrain.sectors > 1) {
                    extr = Sector.getContainerExtr(_sector.booty)
                } else {
                    extr = 110

                    const tutorialResp: TTutorial = {
                        event: 'tutorial',
                        payload: {
                            type: 'hold'
                        }
                    }
                    uSocket.send(JSON.stringify(tutorialResp))

                }

                const hold = zone.hold.addExtrToList(extr)

                if (hold === 'limit') {
                    const limitResp: TLimit = {
                        event: 'limit',
                        payload: {
                            gives: 'hold'
                        }
                    }
                    uSocket.send(JSON.stringify(limitResp))
                    return
                }
            }

            extrResp = {
                event: 'attraction',
                payload: {
                    extr,
                    cont: _sector.booty,
                    fort: __fort,
                    pos: __position
                }
            }

            if (extr) {
                _sector.takenBooty()
                this._logs.takes.add(_sector.id)
                this._zoneService.memoryUpdate(zone)
                this._sectorService.update(_sector)
            }

        } catch (e) {
            extrResp = {
                event: 'attraction',
                payload: {
                    extr: null,
                    cont: 0,
                    fort: null,
                    pos: __position
                }
            }

        }

        uSocket.send(JSON.stringify(extrResp))

    }
}

// TakeHandler.EVENT = 'take'

export {
    BeamHandler
}