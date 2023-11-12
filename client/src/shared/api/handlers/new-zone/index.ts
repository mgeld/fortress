import { Handler } from "..";
import { TNewZone } from '@ctypes/socket/server-to-client'
import { noticeModel } from "shared/ui/notice";
import { userAPI, zoneAPI } from "shared/api/events";

class NewZoneHandler extends Handler {
    handle(message: TNewZone) {

        console.log('NewZoneHandler message', message)
        zoneAPI.events.setZoneLevel(message.payload.level)
        userAPI.events.setRankExp(0)

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