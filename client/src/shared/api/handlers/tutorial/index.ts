import { Handler } from "..";
import { tutorialModel } from "shared/ui/tutorial";
import { TTutorial } from '@ctypes/socket/server-to-client'

class TutorialHandler extends Handler {
    handle(message: TTutorial) {
        if (message.payload.type === 'hold') {
            setTimeout(() => {
                tutorialModel.events.setTutorial('hold')
            }, 4000)
        }

        if (message.payload.type === 'ship') {
            setTimeout(() => {
                tutorialModel.events.setTutorial('ship')
            }, 6000)
        }

    }
}

TutorialHandler.EVENT = "tutorial"

export {
    TutorialHandler
}