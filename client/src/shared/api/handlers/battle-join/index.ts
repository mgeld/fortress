import { Handler } from ".."
import { noticeModel } from "shared/ui/notice"
import { TBattleJoin } from '@ctypes/socket/server-to-client'
import { battleAPI, mapAPI, shipAPI } from "shared/api/events"

class BattleJoinHandler extends Handler {
    handle(message: TBattleJoin) {

        const status = message.payload.status

        if (status === 'start') {
            noticeModel.events.newToast({
                name: 'Не удалось присоединиться!',
                text: 'Битва уже началась, но Вы можете начать на арене новое сражение',
                t: 'warning'
            })
            return
        }

        if (status === 'over') {
            noticeModel.events.newToast({
                name: 'Не удалось присоединиться!',
                text: 'Эта битва уже завершилась, но Вы можете начать на арене новое сражение',
                t: 'warning'
            })
            return
        }

        if (message.payload?.user) {

            mapAPI.events.setMapMode('battle')
            battleAPI.events.setBattleStatus(message.payload.status)

            battleAPI.events.setMyTeam(message.payload.user.team)
            shipAPI.events.setPos(message.payload.user.pos)
        }
    }
}

BattleJoinHandler.EVENT = "battle-join"

export {
    BattleJoinHandler
}