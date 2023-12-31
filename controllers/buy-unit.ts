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

        if (!uSocket.user_id) return

        const __id = message.payload?.id

        if (!__id) return

        const zone = await this._zoneService.getById(uSocket.user_id)

        const cost = Units.getUnitPrice(__id)

        let isSpend = 0

        if (cost.currency === 'coins') {
            isSpend = zone.spendСoins(cost.price)
        } else if (cost.currency === 'rubies') {
            isSpend = zone.spendRubies(cost.price)
        }

        if (isSpend < 0) {
            const limitResp: TLimit = {
                event: 'limit',
                payload: {
                    gives: cost.currency
                }
            }
            uSocket.send(JSON.stringify(limitResp))
            return
        }

        const extr = zone.hold.addExtrToList(__id)

        if (extr === 'limit') {
            const limitResp: TLimit = {
                event: 'limit',
                payload: {
                    gives: 'hold'
                }
            }
            uSocket.send(JSON.stringify(limitResp))
        } else {

            this._zoneService.memoryUpdate(zone)

            const extrResp: TBuyUnit = {
                event: 'buy-unit',
                payload: {
                    type: __id,
                    currency: cost.currency,
                    cost: cost.price,
                    unit: __id
                }
            }
            uSocket.send(JSON.stringify(extrResp))
        }

    }
}

export {
    BuyUnitHandler
}