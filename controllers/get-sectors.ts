import { TEventGetSectors, TGetSectorsAPI } from "../common-types/socket/client-to-server"
import { IWebSocket } from "../api/socket/server";
import { IRoute } from "./handlers"
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { SectorService } from "../services/sector.service";
import { Areal } from "../entities/pointer/areal";

@injectable()
class GetSectorsHandler extends IRoute {
    @inject(TYPES.SectorService) private _sectorService!: SectorService
    // @inject(TYPES.PointerService) private _pointerService!: PointerService

    public static EVENT: TEventGetSectors = "getSectors"

    async handle(
        message: TGetSectorsAPI,
        uSocket: IWebSocket,
    ) {
        
        const __position = message.payload?.position

        if (!__position) return
        
        const areal = Areal.generator(__position)

        const _sectors = await this._sectorService.getZonesAroundAreal(areal)

        const array_sectors = Object.values(_sectors)

        uSocket.send(JSON.stringify({
            event: 'sectors',
            payload: array_sectors
        }))

    }
}

// TakeHandler.EVENT = 'take'

export {
    GetSectorsHandler
}