import { TBuyUnit } from "../common-types/socket/server-to-client"
import { TBuyUnitAPI, TEventBuyUnit } from "../common-types/socket/client-to-server"
import { IWebSocket } from "../api/socket/server";
import { IRoute } from "./handlers"
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { ZoneService } from "../services/zone.service";
import { Units } from "../entities/units/units";

@injectable()
class BuyUnitHandler extends IRoute {
    @inject(TYPES.ZoneService) private _zoneService!: ZoneService

    public static EVENT: TEventBuyUnit = "buyUnit"

    async handle(
        message: TBuyUnitAPI,
        uSocket: IWebSocket,
    ) {
        console.log('BuyUnitHandler handle')

        if (!uSocket.user_id) return

        const zone = await this._zoneService.getById(uSocket.user_id)

        const cost = Units.getUnit(message.payload.id)

        if (cost.currency === 'coins') {
            zone.spendСoins(cost.price)
        }

        const extr = zone.extraction.addExtrToList(message.payload.id)

        this._zoneService.memoryUpdate(zone)

        const extrResp: TBuyUnit = {
            event: 'buy-unit',
            payload: {
                type: 'common',
                currency: cost.currency,
                cost: cost.price,
                unit: message.payload.id
            }
        }
        uSocket.send(JSON.stringify(extrResp))

    }
}

export {
    BuyUnitHandler
}