import { citadelAPI } from "shared/api/events";
import { Handler } from "..";
import { TSetCitadel } from '@ctypes/socket/server-to-client'

class SetCitadelHandler extends Handler {
    handle(message: TSetCitadel) {
        console.log('SetCitadelHandler handle')
        if(message.payload) citadelAPI.events.setCitadel(message.payload)
    }
}

SetCitadelHandler.EVENT = "set-citadel"

export {
    SetCitadelHandler
}