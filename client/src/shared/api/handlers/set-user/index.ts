import { shipAPI } from "shared/api/events";
import { Handler } from "..";
import { TSetUser } from '@ctypes/socket/server-to-client'

class SetUserHandler extends Handler {
    handle(message: TSetUser) {
        console.log('SetUserHandler handle')

        const { user } = message.payload

        if (user?.health) shipAPI.events.setHealth(user.health)
        if (user?.pos) shipAPI.events.setPos(user.pos)

    }
}

SetUserHandler.EVENT = "set-user"

export {
    SetUserHandler
}