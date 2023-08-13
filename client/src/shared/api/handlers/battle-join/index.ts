import { battleAPI, mapAPI, userAPI } from "shared/api/events";
import { Handler } from "..";
import { TBattleJoin } from '@ctypes/socket/server-to-client'

class BattleJoinHandler extends Handler {
    handle(message: TBattleJoin) {
        console.log('BattleJoinHandler handle')
        mapAPI.events.setMapMode('battle')
        userAPI.events.setHealth(message.payload.user.health)

        userAPI.events.setPos(message.payload.user.pos)
        battleAPI.events.setBattleStatus('pending')
    }
}

BattleJoinHandler.EVENT = "battle-join"

export {
    BattleJoinHandler
}