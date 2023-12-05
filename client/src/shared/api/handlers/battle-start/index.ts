import { Handler } from ".."
import { battleAPI, pointersAPI, sectorsAPI } from "shared/api/events"
import { TBattleStart } from '@ctypes/socket/server-to-client'

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
        battleAPI.events.setTimer(120)
        sectorsAPI.events.setSectors([
            {
                zone: {
                    zone_id: 1,
                    color: 1,
                    name: 'Синие'
                },
                sectors: []
            },
            {
                zone: {
                    zone_id: 2,
                    color: 2,
                    name: 'Красные'
                },
                sectors: []
            },
        ])
        setTimeout(() => battleAPI.events.setBattleStatus('start'), 500)

    }
}

BattleStartHandler.EVENT = "battle-start"

export {
    BattleStartHandler
}