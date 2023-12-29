import { Handler } from "..";
import { zoneModel } from "entities/zone";
import { snackbarModel } from "shared/ui/snackbar";
import { TTakeSector } from '@ctypes/socket/server-to-client'
import { sectorsAPI, userAPI, zoneAPI } from "shared/api/events";

class YTakeSectorHandler extends Handler {
    handle(message: TTakeSector) {

        console.log('YTakeSectorHandler message', message)

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

        zoneModel.events.addSector()

        if(message.payload.exp) {
            userAPI.events.setRankExp(message.payload.exp)
        }
        if(message.payload.trp) {
            zoneAPI.events.setZoneTrophies(message.payload.trp)
        }
        
        snackbarModel.events.newToast({
            text: 'Сектор захвачен!',
            t: 1
        })


    }
}

YTakeSectorHandler.EVENT = 'y-take-sector'

export {
    YTakeSectorHandler
}