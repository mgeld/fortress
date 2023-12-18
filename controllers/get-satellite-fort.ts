import { TYPES } from "../types"
import { IRoute } from "./handlers"
import { inject, injectable } from "inversify"
import { IWebSocket } from "../api/socket/server"
import { SectorService } from "../services/sector.service"
import { TEventGetSatelliteFort, TGetSatelliteAPI } from "../common-types/socket/client-to-server"
import { TZoneItem } from "../common-types/model"
import { PointerService } from "../services/pointer.service"
import { TSectorBounds } from "../infra/database/mysql2/repositories/sector"

// import { PointerService } from "../services/pointer.service";

@injectable()
class GetSatelliteFortHandler extends IRoute {
    @inject(TYPES.SectorService) private _sectorService!: SectorService
    @inject(TYPES.PointerService) private _pointerService!: PointerService

    public static EVENT: TEventGetSatelliteFort = "getSatelliteFort"

    async handle(
        message: TGetSatelliteAPI,
        uSocket: IWebSocket,
    ) {

        console.log('GetSatelliteFortHandler')

        const position = message.payload.position

        const _sectors = await this._sectorService.getBoundsFort(position)

        const array_sectors = Object.values(await this.fortUnmarshalSectors(_sectors))

        uSocket.send(JSON.stringify({
            event: 'sectors',
            payload: array_sectors
        }))

    }

    async fortUnmarshalSectors(_sectors: TSectorBounds[]) {

        const sectors: Record<number, TZoneItem> = _sectors.reduce((zoneItems, item) => {
            if (!zoneItems[item.zone_id]) {
                zoneItems[item.zone_id] = {} as TZoneItem
                zoneItems[item.zone_id]['zone'] = {
                    zone_id: item.zone_id,
                    color: 1
                }
                zoneItems[item.zone_id]['sectors'] = []
            }
            zoneItems[item.zone_id]['sectors'].push(item.id)
            
            return zoneItems

        }, {} as Record<number, TZoneItem>)

        let zones: Record<number, number> = {}
        _sectors.forEach(item => {
            zones[item.zone_id] = item.zone_id
        })
        const _pointers = await this._pointerService.getZoneByIds(Object.values(zones))

        const array_sectors = Object.values(sectors)

        const __sectors = array_sectors.map(zone => {
            const user = _pointers.find(pointer => pointer.zone_id === zone.zone.zone_id)
            return {
                zone: {
                    ...zone.zone,
                    color: user?.color || -1
                },
                sectors: zone.sectors
            }
        })

        return __sectors
    }
}

// TakeHandler.EVENT = 'take'

export {
    GetSatelliteFortHandler
}