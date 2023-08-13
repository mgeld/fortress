import { userAPI } from "shared/api/events";
import { Handler } from "..";
import { TSetUser } from '@ctypes/socket/server-to-client'

class SetUserHandler extends Handler {
    handle(message: TSetUser) {
        console.log('SetUserHandler handle')

        console.log('qqqqqqqqqqqqqqqqqqqqqqqq SetUserHandler')
        
        console.log('message.payload.user.pos', message.payload.user.pos)
        userAPI.events.setHealth(message.payload.user.health)
        userAPI.events.setPos(message.payload.user.pos)
    }
}

SetUserHandler.EVENT = "set-user"

export {
    SetUserHandler
}