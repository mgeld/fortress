import { battleAPI, pointersAPI } from "shared/api/events";
import { Handler } from "..";
import { TBattle } from '@ctypes/socket/server-to-client'

class BattleStartHandler extends Handler {
    handle(message: TBattle) {
        console.log('-----/////-----/////------BattleStartHandler handle')
        // pointersAPI.events.newPointer(message.payload)
        pointersAPI.events.setPointers(message.payload.pointers)
        battleAPI.events.setBattleStatus('start')
    }
}

BattleStartHandler.EVENT = "battle-start"

export {
    BattleStartHandler
}