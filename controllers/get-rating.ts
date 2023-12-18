
import { inject, injectable } from "inversify";
import { IWebSocket } from "../api/socket/server";
import { TEventGetRating, TGetRatingAPI } from "../common-types/socket/client-to-server";
import { TYPES } from "../types";
import { IRoute } from "./handlers";
import { ZoneService } from "../services/zone.service";

@injectable()
class GetRatingHandler implements IRoute {

    // @inject(TYPES.PointerService) private _pointerService!: PointerService
    @inject(TYPES.ZoneService) private _zoneService!: ZoneService

    public static EVENT: TEventGetRating = "getRating"

    async handle(
        message: TGetRatingAPI,
        uSocket: IWebSocket,
    ) {
        console.log('GetRatingHandler')

        if (!uSocket.user_id) return

        // const USER_ID = uSocket.user_id

        let zones = await this._zoneService.getTrophies()

        uSocket.send(JSON.stringify({
            event: 'set-rating',
            payload: {
                zones
            }
        }))

    }
}

export {
    GetRatingHandler
}