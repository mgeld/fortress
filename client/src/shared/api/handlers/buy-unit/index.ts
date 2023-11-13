import { Handler } from "..";
import { TBuyUnit } from '@ctypes/socket/server-to-client'
import { noticeModel } from "shared/ui/notice";
import { popoutModel } from "shared/ui/popout-root";
import { holdAPI, zoneAPI } from "shared/api/events";
import { pageModel } from "shared/ui/page-root";

class BuyUnitHandler extends Handler {
    handle(message: TBuyUnit) {

        console.log('BuyUnitHandler message', message)

        const cost = message.payload.cost
        const currency = message.payload.currency
        const unit = message.payload.unit

        let name = ''
        let text = ''

        if (currency === 'coins') zoneAPI.events.spendСoins(cost)
        else if (currency === 'rubies') zoneAPI.events.spendRubies(cost)

        holdAPI.events.addExtraction(unit);

        switch (unit) {
            case 10:
            case 11:
            case 12:
                name = `Покупка прошла успешно!`
                text = `Модуль опыта добавлен в трюм корабля. Вы можете активрировать модуль в любой момент!`
                break;
            case 20:
            case 21:
            case 22:
                name = `Покупка прошла успешно!`
                text = `Модуль штурмовой силы добавлен в трюм корабля. Вы можете активрировать модуль в любой момент!`
                break;
            case 30:
            case 31:
            case 32:
                name = `Покупка прошла успешно!`
                text = `Модуль здоровья добавлен в трюм корабля. Вы можете активрировать модуль в любой момент!`
                break;
            case 40:
            case 41:
            case 42:
                name = `Покупка прошла успешно!`
                text = `Модуль мощности добавлен в трюм корабля. Вы можете активрировать модуль в любой момент!`
                break;
            case 50:
            case 51:
            case 52:
                name = `Покупка прошла успешно!`
                text = `Модуль дальности добавлен в трюм корабля. Вы можете активрировать модуль в любой момент!`
                break;
            case 100:
            case 101:
                name = `Покупка прошла успешно!`
                text = `Группа штурма добавлена в трюм корабля. Вы можете активрировать предмет в любой момент!`
                break;
            default:
                name = `Покупка прервалась`
                text = `Возникла непредвиденная ошибка`
        }

        popoutModel.events.setPopout(null)
        pageModel.events.setPage('map')

        noticeModel.events.newToast({
            name,
            text,
            t: unit
        })

    }

}

BuyUnitHandler.EVENT = 'buy-unit'

export {
    BuyUnitHandler
}