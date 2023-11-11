import { projectorAPI } from "shared/api/events";
import { Handler } from "..";
import { TFindCont } from '@ctypes/socket/server-to-client'
import { snackbarModel } from "shared/ui/snackbar";

let timeId: ReturnType<typeof setTimeout>

class FindContHandler extends Handler {
    handle(message: TFindCont) {

        console.log('FindContHandler message', message)

        // extractionAPI.events.addExtraction(message.payload.cont)

        projectorAPI.events.setContainer(message.payload)

        snackbarModel.events.newToast({
            text: 'Найден контейнер!',
            t: 7
        })

        if (timeId) {
            clearTimeout(timeId)
        }

        timeId = setTimeout(() => {
            projectorAPI.events.setContainer(null)
        }, 9000)
    }
}

FindContHandler.EVENT = 'find-cont'

export {
    FindContHandler
}