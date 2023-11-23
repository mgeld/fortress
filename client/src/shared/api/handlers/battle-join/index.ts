import { battleAPI, mapAPI, shipAPI } from "shared/api/events";
import { Handler } from "..";
import { TBattleJoin } from '@ctypes/socket/server-to-client'

class BattleJoinHandler extends Handler {
    handle(message: TBattleJoin) {
        console.log('BattleJoinHandler handle')
        shipAPI.events.setPos(message.payload.user.pos)
        mapAPI.events.setMapMode('battle')
        // shipAPI.events.setHealth(message.payload.user.health)
        battleAPI.events.setBattleStatus('pending')
        battleAPI.events.setMyTeam(message.payload.user.team)
    }
}

BattleJoinHandler.EVENT = "battle-join"

export {
    BattleJoinHandler
}