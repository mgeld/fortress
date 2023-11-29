import { pointersAPI } from "shared/api/events";
import { Handler } from "..";
import { TConnectPointer } from '@ctypes/socket/server-to-client'
// import { tutorialModel } from "shared/ui/tutorial";

class ConnectPointerHandler extends Handler {
    handle(message: TConnectPointer) {

        pointersAPI.events.newPointer(message.payload)

        // if(message.payload.userId === -1) {
        //     setTimeout(() => {
        //         tutorialModel.events.setTutorial('gun')
        //     }, 2000)
        // }
    }
}

ConnectPointerHandler.EVENT = "connect-pointer"

export {
    ConnectPointerHandler
}