import { sectorsAPI } from "shared/api/events";
import { Handler } from "..";

import { TSectors } from '@ctypes/socket/server-to-client'

class AddSectorsHandler extends Handler {
    handle(message: TSectors) {
        console.log('AddSectorsHandler')
        sectorsAPI.events.addSectors(message.payload)
    }
}

AddSectorsHandler.EVENT = 'add-sectors'

export {
    AddSectorsHandler
}