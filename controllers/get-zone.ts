
import { inject, injectable } from "inversify";
import { IWebSocket } from "../api/socket/server";
import { TEventGetZone, TGetZoneAPI } from "../common-types/socket/client-to-server";
import { TYPES } from "../types";
import { IRoute } from "./handlers";
import { ZoneService } from "../services/zone.service";

@injectable()
class GetZoneHandler implements IRoute {

    @inject(TYPES.ZoneService) private _zoneService!: ZoneService

    public static EVENT: TEventGetZone = "getZone"

    async handle(
        message: TGetZoneAPI,
        uSocket: IWebSocket,
    ) {

        if (!uSocket.user_id) return

        const __zoneId = +message.payload?.id

        if (!__zoneId) return

        let zone = await this._zoneService.getZone(__zoneId)

        uSocket.send(JSON.stringify({
            event: 'set-zone',
            payload: {
                ...zone
            }
        }))

    }
}

export {
    GetZoneHandler
}