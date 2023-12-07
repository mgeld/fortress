import { Handler } from "..";
import { holdAPI, projectorAPI, shipAPI, stormAPI, zoneAPI } from "shared/api/events";
import { TTractorUnit } from '@ctypes/socket/server-to-client'
import { TBooty } from "entities/projector/model/tractor-beam";
import { noticeModel } from "shared/ui/notice";
import { snackbarModel } from "shared/ui/snackbar";
import { TConts } from "@ctypes/model";
import { zoneModel } from "entities/zone";

class AttractionHandler extends Handler {

    handle(message: TTractorUnit) {

        const BOOTY_ID: number = Date.now()


        const to_pos = message.payload.pos
        const from_pos = message.payload.fort

        const type = message.payload.type

        if (!type) {
            snackbarModel.events.newToast({
                text: 'Ничего не притянулось',
                t: 8
            })
            return
        }

        if (type === 'cont') {
            const cont = message.payload.data.cont
            const extr = message.payload.data.extr

            let _booty: TBooty = {
                id: BOOTY_ID,
                unit: cont,
                to_pos,
                from_pos,
            }

            projectorAPI.events.addBooty(_booty)

            setTimeout(() => {
                projectorAPI.events.delBootyById({ booty_id: BOOTY_ID })
                holdAPI.events.addExtraction(extr);

                let typeNotice = ('cont_' + cont) as TConts
                noticeModel.events.newToast({
                    name: 'Получен контейнер',
                    text: 'Предмет из контейнера добавлен в трюм корабля',
                    t: typeNotice
                })

            }, 2200)

        } else if (type === 'strm') {

            let _booty: TBooty = {
                id: BOOTY_ID,
                unit: 10,
                to_pos,
                from_pos,
            }

            projectorAPI.events.addBooty(_booty)

            stormAPI.events.addInvaders(1)

            setTimeout(() => {
                projectorAPI.events.delBootyById({ booty_id: BOOTY_ID })

                snackbarModel.events.newToast({
                    text: 'Штурмовик возвращен',
                    t: 11
                })

            }, 2200)
        }

        // if (!from_pos) {
        //     snackbarModel.events.newToast({
        //         text: 'Ничего не притянулось',
        //         t: 8
        //     })
        //     return
        // }
    }
}

AttractionHandler.EVENT = 'attraction'

export {
    AttractionHandler
}