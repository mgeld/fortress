import { Handler } from "..";
import { citadelAPI } from "shared/api/events";
import { tutorialModel } from "shared/ui/tutorial";
import { TSetCitadel } from '@ctypes/socket/server-to-client'

class SetCitadelHandler extends Handler {
    handle(message: TSetCitadel) {
        if(message.payload) {

            citadelAPI.events.setCitadel(message.payload)

            setTimeout(() => {
                tutorialModel.events.setTutorial('projector')
            }, 2000)

        }
    }
}

SetCitadelHandler.EVENT = "set-citadel"

export {
    SetCitadelHandler
}