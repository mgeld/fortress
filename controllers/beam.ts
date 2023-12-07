import { TLimit, TTractorUnit, TTutorial } from "../common-types/socket/server-to-client"
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

        let beamResp: TTractorUnit = {
            event: 'attraction',
            payload: {
                type: null,
                data: null,
                fort: __fort,
                pos: __position
            }
        }

        try {
            _sector = await this._sectorService.getById(__sector)

            // let typeTractor = null

            if (_sector.booty) {

                let extr: TExtrTypes | null = null

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

                beamResp.payload.type = 'cont'
                beamResp.payload.data = {
                    extr,
                    cont: _sector.booty,
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

                _sector.takenBooty()

            } else {

                if (zone.id === _sector.zone_id) {

                    if (_sector.defenders > 1) {

                        beamResp.payload.type = 'strm'
                        beamResp.payload.data = null

                        let resultIncrese: [number, number] | 'limit' = zone.stormtrooper_corps.addInvaders(1)

                        if (resultIncrese === 'limit') {
                            const limitResp: TLimit = {
                                event: 'limit',
                                payload: {
                                    gives: 'stormtroopers'
                                }
                            }
                            uSocket.send(JSON.stringify(limitResp))
                            return
                        }
                        
                        _sector.killDefender()
                        zone.terrain.killDefender()

                    }
                }

            }

            console.log('beamResp.payload.type', beamResp.payload.type)

            if (beamResp.payload.type) {
                this._logs.takes.add(_sector.id)
                this._zoneService.memoryUpdate(zone)
                this._sectorService.update(_sector)
            }

        } catch (e) {
            // beamResp = {
            //     event: 'attraction',
            //     payload: {
            //         type: 'cont',
            //         data: null,
            //         fort: null,
            //         pos: __position
            //     }
            // }

        }

        console.log('beamResp', beamResp)
        
        uSocket.send(JSON.stringify(beamResp))

    }
}

// TakeHandler.EVENT = 'take'

export {
    BeamHandler
}