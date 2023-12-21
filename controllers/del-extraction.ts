import { TDelExtraction } from "../common-types/socket/server-to-client"
import { TEventDelExtraction, TUseExtractionAPI } from "../common-types/socket/client-to-server"
import { IWebSocket } from "../api/socket/server";
import { IRoute } from "./handlers"
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { ZoneService } from "../services/zone.service";

@injectable()
class DelExtractionHandler extends IRoute {
    @inject(TYPES.ZoneService) private _zoneService!: ZoneService

    public static EVENT: TEventDelExtraction = "delExtraction"

    async handle(
        message: TUseExtractionAPI,
        uSocket: IWebSocket,
    ) {

        if (!uSocket.user_id) return

        const __id = message.payload?.id
        const __index = message.payload?.index

        if (!__id) return

        const zone = await this._zoneService.getById(uSocket.user_id)

        const extr = zone.hold.delExtr(__id, __index)

        if (!extr) return

        this._zoneService.memoryUpdate(zone)

        const extrResp: TDelExtraction = {
            event: 'del-extraction',
            payload: {
                unit: __id,
                index: __index
            }
        }
        uSocket.send(JSON.stringify(extrResp))

    }
}

export {
    DelExtractionHandler
}