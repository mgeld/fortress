import { Handler } from "..";
import { TNewRank } from '@ctypes/socket/server-to-client'
import { noticeModel } from "shared/ui/notice";
import { userAPI } from "shared/api/events";

class NewRankHandler extends Handler {
    handle(message: TNewRank) {

        console.log('NewRankHandler message', message)
        userAPI.events.setRankLevel(message.payload.rank)
        userAPI.events.setRankExp(0)

        // popoutModel.events.setPopout(null)
        // pageModel.events.setPage('map')

        noticeModel.events.newToast({
            name: 'Новый Ранг Завоеваний!',
            text: 'Вы достигли нового Ранга Завоеваний!',
            t: 'rank'
        })

    }

}

NewRankHandler.EVENT = 'new-rank'

export {
    NewRankHandler
}