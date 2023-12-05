import { Handler } from "..";
import { TNewZone } from '@ctypes/socket/server-to-client'
import { noticeModel } from "shared/ui/notice";
import { zoneAPI } from "shared/api/events";

class NewZoneHandler extends Handler {
    handle(message: TNewZone) {

        zoneAPI.events.setZoneLevel(message.payload.level)

        // popoutModel.events.setPopout(null)
        // pageModel.events.setPage('map')

        noticeModel.events.newToast({
            name: 'Новый Уровень Зоны!',
            text: 'Вы достигли новый уровень зоны!',
            t: 'level-zone'
        })

    }

}

NewZoneHandler.EVENT = 'new-zone'

export {
    NewZoneHandler
}