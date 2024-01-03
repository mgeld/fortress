import { Handler } from ".."
import { battleAPI } from "shared/api/events"
import { popoutModel } from "shared/ui/popout-root"
import { TBattleId } from "@ctypes/socket/server-to-client"

class BattleIdHandler extends Handler {
    handle(message: TBattleId) {

        const { id } = message.payload

        battleAPI.events.setBattleShareId(id)
        popoutModel.events.setPopout('battle-link')

    }
}

BattleIdHandler.EVENT = "battle-id"

export {
    BattleIdHandler
}