import { Handler } from "..";
import { TBattleTakeSector } from '@ctypes/socket/server-to-client'
import { battleAPI, sectorsAPI } from "shared/api/events";
import { snackbarModel } from "shared/ui/snackbar";

class BattleYTakeSectorHandler extends Handler {
    handle(message: TBattleTakeSector) {
        if (message.payload.prev_owner_id > 0)
            sectorsAPI.events.setSectorById({
                new_zone_id: message.payload.new_owner_id,
                prev_zone_id: message.payload.prev_owner_id,
                sector: message.payload.sector_id,
                area: message.payload.area
            })
        else
            sectorsAPI.events.addSector({
                zone_id: message.payload.new_owner_id,
                sector: message.payload.sector_id,
                area: message.payload.area
            })

        battleAPI.events.addSector({
            team: message.payload.new_owner_id
        })

        battleAPI.events.loseSector({
            team: message.payload.prev_owner_id
        })

        snackbarModel.events.newToast({
            text: 'Сектор захвачен!',
            t: 1
        })

    }
}

BattleYTakeSectorHandler.EVENT = 'battle-y-take-sector'

export {
    BattleYTakeSectorHandler
}