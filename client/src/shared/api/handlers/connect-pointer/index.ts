import { pointersAPI } from "shared/api/events";
import { Handler } from "..";
import { TConnectPointer } from '@ctypes/socket/server-to-client'

class ConnectPointerHandler extends Handler {
    handle(message: TConnectPointer) {
        console.log('ConnectPointerHandler handle')
        console.log('ConnectPointerHandler message.payload', message.payload)
        pointersAPI.events.newPointer(message.payload)
    }
}

ConnectPointerHandler.EVENT = "connect-pointer"

export {
    ConnectPointerHandler
}