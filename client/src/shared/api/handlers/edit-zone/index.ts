import { sectorsAPI, userAPI, zoneAPI } from "shared/api/events";
import { Handler } from "..";
import { TEditZone } from '@ctypes/socket/server-to-client'
import { popoutModel } from "shared/ui/popout-root";
import { setSelectMyZone } from "features/user/select-zone";

class EditZoneHandler extends Handler {
    handle(message: TEditZone) {
        const update = message.payload

        if (update?.color) {
            sectorsAPI.events.setMyZoneColor(update.color)
        }
        if (update?.description !== undefined) zoneAPI.events.setZoneDescription(update.description)
        if (update?.name) userAPI.events.setName(update.name)
        if (update?.icon) userAPI.events.setUserIcon(update.icon)
        
        setTimeout(setSelectMyZone, 500)

        popoutModel.events.setPopout(null)

    }
}

EditZoneHandler.EVENT = "edit-zone"

export {
    EditZoneHandler
}