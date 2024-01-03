import { TEventGetSectors, TGetSectorsAPI } from "../common-types/socket/client-to-server"
import { IWebSocket } from "../api/socket/server";
import { IRoute } from "./handlers"
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { SectorService } from "../services/sector.service";
import { Areal } from "../entities/pointer/areal";
import { PointerService } from "../services/pointer.service";

@injectable()
class GetSectorsHandler extends IRoute {
    @inject(TYPES.SectorService) private _sectorService!: SectorService
    @inject(TYPES.PointerService) private _pointerService!: PointerService

    public static EVENT: TEventGetSectors = "getSectors"

    async handle(
        message: TGetSectorsAPI,
        uSocket: IWebSocket,
    ) {
        
        if (!uSocket.user_id) return

        const __position = message.payload?.position

        if (!__position) return
        
        // const areal = Areal.generator(__position)
        let areals = Areal.generatorAreals(__position)

        // const _sectors = await this._sectorService.getZonesAroundAreal(areal)
        const _sectors = await this._sectorService.getZonesAroundAreals(areals)
        
        const _pointer = await this._pointerService.memoryGetById(uSocket.user_id)

        const array_sectors = Object.values(_sectors)

        if (array_sectors.length > 0) {

            let zones: Record<number, number> = {}
            array_sectors.forEach(item => {
                zones[item.zone.zone_id] = item.zone.zone_id
            })

            const _pointers = await this._pointerService.getZoneByIds(Object.values(zones))

            const sectors = array_sectors.map(zone => {
                const user = _pointers.find(pointer => pointer.zone_id === zone.zone.zone_id)
                return {
                    zone: {
                        ...zone.zone,
                        color: user?.color
                    },
                    sectors: zone.sectors
                }
            })

            // Если у меня нет сектора в этом ареале
            if (!(_pointer.zoneId in zones)) {
                sectors.push({
                    zone: {
                        zone_id: _pointer.zoneId,
                        color: _pointer.color
                    },
                    sectors: {}
                })
            }

            uSocket.send(JSON.stringify({
                event: 'set-sectors',
                payload: sectors
            }))

        } else {
            const sectors = [{
                zone: {
                    zone_id: _pointer.zoneId,
                    color: _pointer.color
                },
                sectors: {}
            }]

            uSocket.send(JSON.stringify({
                event: 'set-sectors',
                payload: sectors
            }))
        }

        // uSocket.send(JSON.stringify({
        //     event: 'set-sectors',
        //     payload: array_sectors
        // }))

    }
}

// TakeHandler.EVENT = 'take'

export {
    GetSectorsHandler
}