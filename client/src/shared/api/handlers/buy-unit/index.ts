import { Handler } from "..";
import { TBuyUnit, TUseExtraction } from '@ctypes/socket/server-to-client'
import { noticeModel } from "shared/ui/Notice";
import { pageModel } from "shared/ui/PageRoot";
import { popoutModel } from "shared/ui/PopoutRoot";
import { extractionAPI, weaponsAPI } from "shared/api/events";

class BuyUnitHandler extends Handler {
    handle(message: TBuyUnit) {

        console.log('BuyUnitHandler message', message)

        const cost = message.payload.cost
        const currency = message.payload.currency
        const unit = message.payload.unit

        let name = ''
        let text = ''

        switch (unit) {
            case 10:
            case 11:
            case 12:
                name = `Успешная покупка`
                text = `Вы купили`
                break;
            default:
                name = `Ошибка`
                text = `Возникла непредвиденная ошибка`
        }

        popoutModel.events.setPopout(null)
        pageModel.events.setPage('map')

        noticeModel.events.newToast({
            name,
            text,
            t: message.payload.type
        })

    }

}

BuyUnitHandler.EVENT = 'buy-unit'

export {
    BuyUnitHandler
}