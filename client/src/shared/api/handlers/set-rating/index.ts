import { ratingAPI } from "shared/api/events";
import { Handler } from "..";
import { TSetRating } from '@ctypes/socket/server-to-client'

class SetRatingHandler extends Handler {
    handle(message: TSetRating) {
        const { zones } = message.payload

        ratingAPI.events.setZones(zones)

        // if (user?.health) shipAPI.events.setHealth(user.health)
        // if (user?.pos) shipAPI.events.setPos(user.pos)

    }
}

SetRatingHandler.EVENT = "set-rating"

export {
    SetRatingHandler
}