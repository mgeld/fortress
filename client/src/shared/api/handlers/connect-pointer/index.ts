import { pointersAPI } from "shared/api/events";
import { Handler } from "..";
import { TConnectPointer } from '@ctypes/socket/server-to-client'
// import { tutorialModel } from "shared/ui/tutorial";

class ConnectPointerHandler extends Handler {
    handle(message: TConnectPointer) {

        pointersAPI.events.newPointer(message.payload)

    }
}

ConnectPointerHandler.EVENT = "connect-pointer"

export {
    ConnectPointerHandler
}