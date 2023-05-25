import { userAPI, weaponsAPI } from "shared/api/events";
import { Handler } from "..";
import { TConnect } from '@ctypes/socket/server-to-client'

class ConnectHandler extends Handler {
    handle(message: TConnect) {
        console.log('ConnectHandler handle')
        weaponsAPI.events.setWeapons(message.payload.weapon)
        userAPI.events.setHealth(message.payload.user.health)
    }
}

ConnectHandler.EVENT = "connect"

export {
    ConnectHandler
}