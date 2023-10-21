import { pointersAPI } from "shared/api/events";
import { Handler } from "..";
import { TDirectPointer } from '@ctypes/socket/server-to-client'

class DirectPointerHandler extends Handler {
    handle(message: TDirectPointer) {
        console.log('______________DirectPointerHandler handle')
        console.log('______________DirectPointerHandler message.payload', message.payload)
        pointersAPI.events.updatePositionPointer(message.payload)
    }
}

DirectPointerHandler.EVENT = "direct"

export {
    DirectPointerHandler
}