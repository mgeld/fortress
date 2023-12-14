import { pointersAPI } from "shared/api/events";
import { Handler } from "..";

import { TPointers } from '@ctypes/socket/server-to-client'

class PointersHandler extends Handler {
    handle(message: TPointers) {
        pointersAPI.events.setPointers(message.payload.pointers)
    }
}

PointersHandler.EVENT = 'pointers'

export {
    PointersHandler
}