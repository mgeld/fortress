import { battleAPI, mapAPI, shipAPI } from "shared/api/events";
import { Handler } from "..";
import { TBattleJoin } from '@ctypes/socket/server-to-client'

class BattleJoinHandler extends Handler {
    handle(message: TBattleJoin) {
        console.log('BattleJoinHandler handle')
        mapAPI.events.setMapMode('battle')
        shipAPI.events.setHealth(message.payload.user.health)
        shipAPI.events.setPos(message.payload.user.pos)
        battleAPI.events.setBattleStatus('pending')
    }
}

BattleJoinHandler.EVENT = "battle-join"

export {
    BattleJoinHandler
}