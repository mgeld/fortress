import { sectorsAPI } from "shared/api/events";
import { Handler } from "..";
import { TTakeSector } from '@ctypes/socket/server-to-client'

class TakeSectorHandler extends Handler {
    handle(message: TTakeSector) {

        console.log('TakeSectorHandler')

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
        // snackbarModel.events.newToast('Сектор захвачен!')
    }
}

TakeSectorHandler.EVENT = 'take-sector'

export {
    TakeSectorHandler
}