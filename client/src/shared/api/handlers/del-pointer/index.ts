import { pointersAPI } from "shared/api/events";
import { Handler } from "..";
import { TDelPointer } from '@ctypes/socket/server-to-client'

class DelPointerHandler extends Handler {
    handle(message: TDelPointer) {

        console.log('DelPointerHandler userId', message.payload?.userId)
        pointersAPI.events.delPointer(message.payload)
    }
}

DelPointerHandler.EVENT = "del-pointer"

export {
    DelPointerHandler
}