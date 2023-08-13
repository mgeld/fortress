import { Handler } from ".."
import { battleAPI, mapAPI, pointersAPI } from "shared/api/events"
import { TBattleStart } from '@ctypes/socket/server-to-client'
// import { filterPointersStore } from "widgets/map-layout/model"

class BattleStartHandler extends Handler {
    handle(message: TBattleStart) {
        
        // filterPointersStore()

        // VK BRIDGE GET AVATARS FOR POINTERS

        pointersAPI.events.setPointers(message.payload.pointers)
        
        battleAPI.events.setArena({
            id: message.payload.battleId,
            time_start: message.payload.timeStart,
            place: message.payload.place
        })
        battleAPI.events.setTeams(message.payload.teams)
        battleAPI.events.setBattleStatus('start')
    }
}

BattleStartHandler.EVENT = "battle-start"

export {
    BattleStartHandler
}