import { TUseExtraction } from "../common-types/socket/server-to-client"
import { TEventUseExtraction, TUseExtractionAPI } from "../common-types/socket/client-to-server"
import { IWebSocket } from "../api/socket/server";
import { IRoute } from "./handlers"
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { ZoneService } from "../services/zone.service";

@injectable()
class UseExtractionHandler extends IRoute {
    @inject(TYPES.ZoneService) private _zoneService!: ZoneService

    public static EVENT: TEventUseExtraction = "useExtraction"

    async handle(
        message: TUseExtractionAPI,
        uSocket: IWebSocket,
    ) {
        console.log('UseExtractionHandler handle')

        if (!uSocket.user_id) return

        const zone = await this._zoneService.getById(uSocket.user_id)

        const extr = zone.extraction.use(message.payload.id, message.payload.index)
        this._zoneService.memoryUpdate(zone)

        const extrResp: TUseExtraction = {
            event: 'use-extraction',
            payload: {
                amount: extr.quantity,
                type: extr.gives,
                index: message.payload.index
            }
        }
        uSocket.send(JSON.stringify(extrResp))

    }
}

export {
    UseExtractionHandler
}