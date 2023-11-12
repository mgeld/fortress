import { Handler } from "..";
import { TLevelUp } from '@ctypes/socket/server-to-client'
import { noticeModel } from "shared/ui/notice";
import { popoutModel } from "shared/ui/popout-root";
import { holdAPI, shipAPI, stormAPI, weaponsAPI, zoneAPI } from "shared/api/events";
import { pageModel } from "shared/ui/page-root";

class LevelUpHandler extends Handler {
    handle(message: TLevelUp) {

        console.log('LevelUpHandler message', message)

        const new_level = message.payload.new_level
        const cost = message.payload.cost
        const currency = message.payload.currency
        const type = message.payload.type

        let name = ''
        let text = ''

        if(currency === 'coins') zoneAPI.events.spendСoins(cost)
        else if(currency === 'rubies') zoneAPI.events.spendRubies(cost)

        switch (type) {
            case 'ship':
                name = `Повышение уровня`
                text = `Корабль повышен до ${new_level}-го уровня!`
                shipAPI.events.setLevel(new_level)
                break;
            case 'gun':
                name = `Повышение уровня`
                text = `Пушка повышена до ${new_level}-го уровня!`
                weaponsAPI.events.setLevel(new_level)
                break;
            case 'hold':
                name = `Повышение уровня`
                text = `Трюм повышен до ${new_level}-го уровня!`
                holdAPI.events.setLevel(new_level)
                break;
            case 'storm-corps':
                name = `Повышение уровня`
                text = `Штурмовой корпус повышен до ${new_level}-го уровня!`
                stormAPI.events.setStormLevel(new_level)
                break;
        }

        popoutModel.events.setPopout(null)
        pageModel.events.setPage('map')

        // holdAPI.events.delExtraction(message.payload.index)

        noticeModel.events.newToast({
            name,
            text,
            t: 'level-up'
        })

    }

}

LevelUpHandler.EVENT = 'level-up'

export {
    LevelUpHandler
}