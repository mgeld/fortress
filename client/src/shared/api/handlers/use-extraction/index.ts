import { Handler } from "..";
import { TUseExtraction } from '@ctypes/socket/server-to-client'
import { noticeModel } from "shared/ui/notice";
import { popoutModel } from "shared/ui/popout-root";
import { holdAPI, shipAPI, stormAPI, userAPI, weaponsAPI, zoneAPI } from "shared/api/events";
import { pageModel } from "shared/ui/page-root";

class UseExtractionHandler extends Handler {
    handle(message: TUseExtraction) {

        const amount = message.payload.amount

        let name = ''
        let text = ''

        switch (message.payload.type) {
            case 'rank_exp':
                name = `Опыт завоеваний`
                if (amount > 0) {
                    text = `Получено ${amount} единиц опыта завоеваний!`
                    userAPI.events.addRankExp(amount)
                } else {
                    text = `Вы собрали максимальное количество опыта на текущий Ранг Завоеваний!`
                    // userAPI.events.addRankExp(amount)
                }
                break;
            case 'gun_distance':
                name = `Дальность удара`
                text = `Дальность удара пушки увеличена на ${amount} метров!`
                weaponsAPI.events.increaseDistance(amount)
                break;
            case 'gun_power':
                name = `Мощность удара`
                text = `Сила пушечного залпа увеличена на ${amount} единиц!`
                weaponsAPI.events.increasePower(amount)
                break;
            case 'ship_health':
                name = `Состояние корабля`
                text = `Здоровье корабля увеличено на ${amount} единиц!`
                shipAPI.events.addHealth(amount)
                break;
            case 'storm_power':
                name = `Сила штурмовиков`
                text = `Сила штурмовиков повышена на ${amount} единиц!`
                stormAPI.events.improveStormPower(amount)
                break;
            case 'stormtroopers':
                name = `Штурмовики`
                text = `Штурмовой корпус пополнен на ${amount} штурмовиков!`
                stormAPI.events.addInvaders(amount)
                break;
            case 'coins':
                name = `Монеты`
                text = `Вы получили ${amount} монет!`
                zoneAPI.events.addCoins(amount)
                break;
            case 'rubies':
                name = `Кристаллы`
                text = `Вы получили ${amount} кристаллов!`
                zoneAPI.events.addRubies(amount)
                break;
            default:
                name = `Ошибка типа common`
                text = `Обратитесь в поддержку что ли`
                break;
        }

        popoutModel.events.setPopout(null)
        pageModel.events.setPage('map')

        holdAPI.events.delExtraction(message.payload.index)

        noticeModel.events.newToast({
            name,
            text,
            t: message.payload.unit
        })

    }

}

UseExtractionHandler.EVENT = 'use-extraction'

export {
    UseExtractionHandler
}