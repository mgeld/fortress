import { Handler } from "..";
import { TNewRank } from '@ctypes/socket/server-to-client'
import { noticeModel } from "shared/ui/notice";
import { userAPI, zoneAPI } from "shared/api/events";
import { Ranks } from "entities/user/lib/ranks";

class NewRankHandler extends Handler {
    handle(message: TNewRank) {

        userAPI.events.setRankLevel(message.payload.rank)
        userAPI.events.setRankExp(0)

        zoneAPI.events.addRubies(Ranks.getLevelRewardRubies(message.payload.rank))

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