import { Handler } from "..";
import { TReward } from '@ctypes/socket/server-to-client'
import { noticeModel } from "shared/ui/notice";
import { zoneAPI } from "shared/api/events";

class RewardHandler extends Handler {
    handle(message: TReward) {

        const amount = message.payload.amount

        let name = ''
        let text = ''

        switch (message.payload.type) {
            case 'coins':
                name = `Монеты`
                text = `Вы получили ${amount} монет!`
                zoneAPI.events.addCoins(amount)
                break;
            case 'rubies':
                name = `Кристаллы`
                text = `Вы получили ${amount} кристаллов!`
                zoneAPI.events.addRubies(amount)
                break;
            default:
        }

        noticeModel.events.newToast({
            name,
            text,
            t: message.payload.type
        })

    }

}

RewardHandler.EVENT = 'reward'

export {
    RewardHandler
}