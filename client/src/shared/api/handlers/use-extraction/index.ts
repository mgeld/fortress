import { Handler } from "..";
import { TUseExtraction } from '@ctypes/socket/server-to-client'
import { noticeModel } from "shared/ui/Notice";
import { pageModel } from "shared/ui/PageRoot";
import { popoutModel } from "shared/ui/PopoutRoot";
import { extractionAPI } from "shared/api/events";

class UseExtractionHandler extends Handler {
    handle(message: TUseExtraction) {

        console.log('UseExtractionHandler message', message)

        // sectorsAPI.events.setTakeFort(hit)

        const amount = message.payload.amount

        let name = ''
        let text = ''

        switch (message.payload.type) {
            case 'coins':
                name = `Получены монеты`
                text = `Вы получили ${amount} монет`
                break;
            case 'rubies':
                name = `Получены рубины`
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