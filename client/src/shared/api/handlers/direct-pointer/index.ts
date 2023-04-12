import { pointersAPI } from "shared/api/events";
import { Handler } from "..";
import { TDirectPointer } from "../../types/messages";

class DirectPointerHandler extends Handler {
    handle(message: TDirectPointer) {
        console.log('DirectPointerHandler handle')
        pointersAPI.events.updatePositionPointer(message.payload)
    }
}

DirectPointerHandler.EVENT = "direct-pointer"

export {
    DirectPointerHandler
}