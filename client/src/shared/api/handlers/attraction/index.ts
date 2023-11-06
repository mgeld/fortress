import { Handler } from "..";
import { extractionAPI, projectorAPI } from "shared/api/events";
import { TTractorExtr } from '@ctypes/socket/server-to-client'
import { TBooty } from "entities/projector/model/tractor-beam";
import { noticeModel } from "shared/ui/Notice";
import { snackbarModel } from "shared/ui/Snackbar";
import { TConts } from "@ctypes/model";

class AttractionHandler extends Handler {

    handle(message: TTractorExtr) {

        console.log('AttractionHandler')

        const BOOTY_ID: number = Date.now()

        const to_pos = message.payload.pos
        const from_pos = message.payload.fort
        const cont = message.payload.cont
        const extr = message.payload.extr

        if (!cont || !extr) {
            snackbarModel.events.newToast({
                text: 'Ничего не притянулось',
                t: 8
            })
            return
        }

        let typeNotice = ('cont_' + cont) as TConts

        let _booty: TBooty = {
            id: BOOTY_ID,
            cont,
            to_pos,
            from_pos,
        }

        projectorAPI.events.addBooty(_booty)

        setTimeout(() => {
            projectorAPI.events.delBootyById({ booty_id: BOOTY_ID })
            extractionAPI.events.addExtraction(extr);
            noticeModel.events.newToast({
                name: 'Получен контейнер',
                text: 'Контейнер добавлен в инвентарь добычи',
                t: typeNotice
            })
        }, 2200)

    }
}

AttractionHandler.EVENT = 'attraction'

export {
    AttractionHandler
}