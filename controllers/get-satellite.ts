import { TYPES } from "../types"
import { IRoute } from "./handlers"
import { inject, injectable } from "inversify"
import { IWebSocket } from "../api/socket/server"
import { SectorService } from "../services/sector.service"
import { TEventGetSatellite, TGetSatelliteAPI } from "../common-types/socket/client-to-server"
import { TSectorProps } from "../entities/sector/sector"
import { TZoneItem } from "../common-types/model"

// import { PointerService } from "../services/pointer.service";

@injectable()
class GetSatelliteHandler extends IRoute {
    @inject(TYPES.SectorService) private _sectorService!: SectorService
    // @inject(TYPES.PointerService) private _pointerService!: PointerService

    public static EVENT: TEventGetSatellite = "getSatellite"

    async handle(
        message: TGetSatelliteAPI,
        uSocket: IWebSocket,
    ) {

        const zoneId = message.payload.zoneId
        const position = message.payload.position

        const _sectors = await this._sectorService.getBoundsCitadel(position)

        // console.log('GetSatelliteHandler _sectors', _sectors)

        const array_sectors = Object.values(this.unmarshalSectors(zoneId, _sectors))

        uSocket.send(JSON.stringify({
            event: 'sectors',
            payload: array_sectors
        }))

    }

    unmarshalSectors(zoneId: number, _sectors: TSectorProps[]) {
        const sectors: Record<number, TZoneItem> = _sectors.reduce((zoneItems, item) => {
            
            const zId = zoneId === item.zone_id ? zoneId : -1
            if (!zoneItems[zId]) {
                zoneItems[zId] = {} as TZoneItem
                zoneItems[zId]['zone'] = {
                    zone_id: zId,
                    name: '',
                    color: 1
                }
                zoneItems[zId]['sectors'] = []
            }
            zoneItems[zId]['sectors'].push(item.id)
            return zoneItems

        }, {} as Record<number, TZoneItem>)
        return sectors
    }
}

// TakeHandler.EVENT = 'take'

export {
    GetSatelliteHandler
}