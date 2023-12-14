import { pointersAPI, sectorsAPI } from "shared/api/events";
import { Handler } from "..";
import { TConnectPointer } from '@ctypes/socket/server-to-client'
// import { tutorialModel } from "shared/ui/tutorial";

class ConnectPointerHandler extends Handler {
    handle(message: TConnectPointer) {

        pointersAPI.events.newPointer(message.payload)

        sectorsAPI.events.addZoneAreal({
            zone_id: message.payload.userId,
            color: message.payload.color
        })

    }
}

ConnectPointerHandler.EVENT = "connect-pointer"

export {
    ConnectPointerHandler
}