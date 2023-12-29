import { sectorsAPI } from "shared/api/events";
import { Handler } from "..";

import { TSectors } from '@ctypes/socket/server-to-client'

class SetSectorsHandler extends Handler {
    handle(message: TSectors) {
        console.log('SetSectorsHandler')
        sectorsAPI.events.setSectors(message.payload)
    }
}

SetSectorsHandler.EVENT = 'set-sectors'

export {
    SetSectorsHandler
}