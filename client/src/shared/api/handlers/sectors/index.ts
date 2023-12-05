import { sectorsAPI } from "shared/api/events";
import { Handler } from "..";

import { TSectors } from '@ctypes/socket/server-to-client'
import { pageModel } from "shared/ui/page-root";

class SectorsHandler extends Handler {
    handle(message: TSectors) {
        console.log('SectorsHandler message', message)
        sectorsAPI.events.setSectors(message.payload)
    }
}

SectorsHandler.EVENT = 'sectors'

export {
    SectorsHandler
}