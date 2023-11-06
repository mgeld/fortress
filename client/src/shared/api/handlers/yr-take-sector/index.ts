import { Handler } from "..";
import { TTakeSector } from '@ctypes/socket/server-to-client'
import { zoneModel } from "entities/zone";
import { sectorsAPI } from "shared/api/events";
import { snackbarModel } from "shared/ui/Snackbar";

class YrTakeSectorHandler extends Handler {
    handle(message: TTakeSector) {

        console.log('YrTakeSectorHandler message', message)

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

        zoneModel.events.delSector()
        snackbarModel.events.newToast({
            text: 'Ваш сектор захвачен!',
            t: 1
        })


    }
}

YrTakeSectorHandler.EVENT = 'yr-take-sector'

export {
    YrTakeSectorHandler
}