import { TBuyUnit, TLimit } from "../common-types/socket/server-to-client"
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

        console.log('message.payload.id', message.payload.id)

        const cost = Units.getUnitPrice(message.payload.id)

        console.log('cost', cost)

        let isSpend = 0

        if (cost.currency === 'coins') {
            isSpend = zone.spendСoins(cost.price)
        } else if (cost.currency === 'rubies') {
            isSpend = zone.spendRubies(cost.price)
        }

        if(isSpend < 0) {
            const limitResp: TLimit = {
                event: 'limit',
                payload: {
                    gives: cost.currency
                }
            }
            uSocket.send(JSON.stringify(limitResp))
            return
        }

        const extr = zone.hold.addExtrToList(message.payload.id)

        this._zoneService.memoryUpdate(zone)

        const extrResp: TBuyUnit = {
            event: 'buy-unit',
            payload: {
                type: message.payload.id,
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