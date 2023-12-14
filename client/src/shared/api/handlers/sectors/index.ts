import { sectorsAPI } from "shared/api/events";
import { Handler } from "..";

import { TSectors } from '@ctypes/socket/server-to-client'

class SectorsHandler extends Handler {
    handle(message: TSectors) {
        sectorsAPI.events.setSectors(message.payload)
    }
}

SectorsHandler.EVENT = 'sectors'

export {
    SectorsHandler
}