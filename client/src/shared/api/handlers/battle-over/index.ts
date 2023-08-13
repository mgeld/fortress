import { Handler } from ".."
import { battleAPI } from "shared/api/events"
import { TBattleOver } from "@ctypes/socket/server-to-client"

class BattleOverHandler extends Handler {
    handle(message: TBattleOver) {
        console.log('*************************** BattleOverHandler', message.payload.teams)

        battleAPI.events.setTeams(message.payload.teams)
        battleAPI.events.setBattleStatus('over')
    }
}

BattleOverHandler.EVENT = "battle-over"

export {
    BattleOverHandler
}