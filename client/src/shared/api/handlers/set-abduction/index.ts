import { abductionAPI } from "shared/api/events";
import { Handler } from "..";
import { TSetAbduction } from '@ctypes/socket/server-to-client'

class SetAbductionHandler extends Handler {
    handle(message: TSetAbduction) {
        const { zones } = message.payload

        abductionAPI.events.setZones(zones)

        // if (user?.health) shipAPI.events.setHealth(user.health)
        // if (user?.pos) shipAPI.events.setPos(user.pos)

    }
}

SetAbductionHandler.EVENT = "set-abduction"

export {
    SetAbductionHandler
}