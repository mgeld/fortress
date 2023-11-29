import { battleAPI, sectorsAPI } from "shared/api/events";
import { Handler } from "..";
import { TBattleTakeSector } from '@ctypes/socket/server-to-client'

class BattleTakeSectorHandler extends Handler {
    handle(message: TBattleTakeSector) {

        if (message.payload.prev_owner_id > 0)
            sectorsAPI.events.setSectorById({
                new_zone_id: message.payload.new_owner_id,
                prev_zone_id: message.payload.prev_owner_id,
                sector: message.payload.sector_id
            })
        else
            sectorsAPI.events.addSector({
                zone_id: message.payload.new_owner_id,
                sector: message.payload.sector_id
            })
        // snackbarModel.events.newToast('Сектор захвачен!')
        
        battleAPI.events.addSector({
            team: message.payload.new_owner_id
        })

    }
}

BattleTakeSectorHandler.EVENT = 'battle-take-sector'

export {
    BattleTakeSectorHandler
}