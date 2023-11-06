import { Handler } from "..";
import { TUseExtraction } from '@ctypes/socket/server-to-client'
import { noticeModel } from "shared/ui/Notice";
import { pageModel } from "shared/ui/PageRoot";
import { popoutModel } from "shared/ui/PopoutRoot";
import { extractionAPI, weaponsAPI } from "shared/api/events";
import { weaponModel } from "entities/weapon";

class UseExtractionHandler extends Handler {
    handle(message: TUseExtraction) {

        console.log('UseExtractionHandler message', message)

        // sectorsAPI.events.setTakeFort(hit)

        const amount = message.payload.amount

        let name = ''
        let text = ''

        switch (message.payload.type) {
            case 'rank_exp':
                name = `Опыт завоеваний`
                
                text = `Вы получили ${amount} монет`
                break;
            case 'gun_distance':
                name = `Дальность удара`
                weaponsAPI.events.setDistance({
                    dist: amount,
                    symbol: 'gun'
                })
                text = `Вы получили ${amount} рубин`
                break;
            case 'gun_power':
                name = `Мощность удара`
                text = `Вы получили ${amount} рубин`
                break;
            case 'ship_health':
                name = `Состояние корабля`
                text = `Вы получили ${amount} рубин`
                break;
            case 'storm_power':
                name = `Сила штурмовиков`
                text = `Вы получили ${amount} рубин`
                break;
            case 'common':
                name = `Что-то общее`
                text = `Вы получили ${amount} рубин`
                break;
            default:
                name = `Нечто`
                text = `Нечто зачислено в ${amount} кол-ве`
        }

        popoutModel.events.setPopout(null)
        pageModel.events.setPage('map')

        extractionAPI.events.delExtraction(message.payload.index)

        noticeModel.events.newToast({
            name,
            text,
            t: message.payload.type
        })

    }

}

UseExtractionHandler.EVENT = 'use-extraction'

export {
    UseExtractionHandler
}