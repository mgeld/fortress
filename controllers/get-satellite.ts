import { TYPES } from "../types"
import { IRoute } from "./handlers"
import { inject, injectable } from "inversify"
import { IWebSocket } from "../api/socket/server"
import { SectorService } from "../services/sector.service"
import { TEventGetSatellite, TGetSatelliteAPI } from "../common-types/socket/client-to-server"
import { TZoneColor, TZoneItem } from "../common-types/model"
import { PointerService } from "../services/pointer.service"
import { TSectorBounds } from "../infra/database/mysql2/repositories/sector"

// import { PointerService } from "../services/pointer.service";

@injectable()
class GetSatelliteHandler extends IRoute {
    @inject(TYPES.SectorService) private _sectorService!: SectorService
    @inject(TYPES.PointerService) private _pointerService!: PointerService

    public static EVENT: TEventGetSatellite = "getSatellite"

    async handle(
        message: TGetSatelliteAPI,
        uSocket: IWebSocket,
    ) {

        const zoneId = message.payload.zoneId
        const position = message.payload.position

        const _pointer = await this._pointerService.getById(zoneId)
        const _sectors = await this._sectorService.getBoundsFort(position)

        const array_sectors = Object.values(this.zoneUnmarshalSectors(zoneId, _pointer.color, _sectors))

        uSocket.send(JSON.stringify({
            event: 'set-sectors',
            payload: array_sectors
        }))

    }

    zoneUnmarshalSectors(zoneId: number, zoneColor: TZoneColor, _sectors: TSectorBounds[]) {
        const sectors: Record<number, TZoneItem> = _sectors.reduce((zoneItems, item) => {
            
            const zId = zoneId === item.zone_id ? zoneId : -1
            const zColor = zoneId === item.zone_id ? zoneColor : 1
            if (!zoneItems[zId]) {
                zoneItems[zId] = {} as TZoneItem
                zoneItems[zId]['zone'] = {
                    zone_id: zId,
                    color: zColor
                }
                zoneItems[zId]['sectors'] = {1: []}
            }
            zoneItems[zId]['sectors'][1].push(item.id)
            return zoneItems

        }, {} as Record<number, TZoneItem>)
        return sectors
    }

}

// TakeHandler.EVENT = 'take'

export {
    GetSatelliteHandler
}