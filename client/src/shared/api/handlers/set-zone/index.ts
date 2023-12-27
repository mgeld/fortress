import { ratingAPI,  } from "shared/api/events";
import { Handler } from "..";
import { TSetZone } from '@ctypes/socket/server-to-client'

class SetZoneHandler extends Handler {
    handle(message: TSetZone) {

        console.log('SetZoneHandler')

        ratingAPI.events.selectRatingZone(message.payload)
    }
}

SetZoneHandler.EVENT = "set-zone"

export {
    SetZoneHandler
}