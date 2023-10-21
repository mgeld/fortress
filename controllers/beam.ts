import { TTractorExtr } from "../common-types/socket/server-to-client"
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
import { Extraction } from "../entities/zone/extraction";
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

        let _sector: Sector

        const zone = await this._zoneService.getById(uSocket.user_id)

        try {
            _sector = await this._sectorService.getById(message.payload.sector)

            let extr: TExtrTypes | null = null

            console.log('_sector.booty', _sector.booty)

            if (_sector.booty) {

                extr = Extraction.getContainerExtr(_sector.booty)
                zone.extraction.addExtrToList(extr)

                console.log('EXTRRRRRRRRRRRR', extr)
                console.log('zone extraction', zone.extraction.unmarshal())

            }

            const extrResp: TTractorExtr = {
                event: 'attraction',
                payload: {
                    extr,
                    cont: _sector.booty,
                    fort: message.payload.fort,
                    pos: message.payload.position
                }
            }

            uSocket.send(JSON.stringify(extrResp))
            
            if(extr) {
                _sector.takenBooty()
                this._logs.takes.add(_sector.id)
                this._zoneService.memoryUpdate(zone)
                this._sectorService.update(_sector)
            }

        } catch (e) {

        }

        

    }
}

// TakeHandler.EVENT = 'take'

export {
    BeamHandler
}