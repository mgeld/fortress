import { sectorsAPI } from "shared/api/events";
import { Handler } from "..";

import { TSector } from '@ctypes/socket/server-to-client'

class SectorHandler extends Handler {
    handle(message: TSector) {
        sectorsAPI.events.setAboutSector(message.payload)
    }
}

SectorHandler.EVENT = 'sector'

export {
    SectorHandler
}