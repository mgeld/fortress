import { Handler } from "..";
import { TDelExtraction } from '@ctypes/socket/server-to-client'
import { noticeModel } from "shared/ui/notice";
import { popoutModel } from "shared/ui/popout-root";
import { holdAPI } from "shared/api/events";
import { pageModel } from "shared/ui/page-root";

class DelExtractionHandler extends Handler {
    handle(message: TDelExtraction) {

        popoutModel.events.setPopout(null)
        pageModel.events.setPage('extraction')

        holdAPI.events.delExtraction(message.payload.index)

        noticeModel.events.newToast({
            name: 'Удаление заверешено',
            text: 'Предмет был успешно удален из трюма!',
            t: message.payload.unit
        })

    }

}

DelExtractionHandler.EVENT = 'del-extraction'

export {
    DelExtractionHandler
}