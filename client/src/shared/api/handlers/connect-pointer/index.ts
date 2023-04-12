import { pointersAPI } from "shared/api/events";
import { Handler } from "..";
import { TConnectPointer } from "../../types/messages";

class ConnectPointerHandler extends Handler {
    handle(message: TConnectPointer) {
        console.log('ConnectPointerHandler handle')
        pointersAPI.events.newPointer(message.payload)

    }
}

ConnectPointerHandler.EVENT = "connect-pointer"

export {
    ConnectPointerHandler
}