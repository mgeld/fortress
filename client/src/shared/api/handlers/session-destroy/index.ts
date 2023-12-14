// import { WS } from "processes/socket";
import { reSocketClose } from "processes/socket/socket-close";
import { Handler } from "..";
import { TSessionDestroy } from '@ctypes/socket/server-to-client'
// import { userAPI } from "shared/api/events";
import { lockModel } from "shared/ui/lock-screen";
import { popoutModel } from "shared/ui/popout-root";

class SessionDestroyHandler extends Handler {
    handle(message: TSessionDestroy) {

        console.log('SessionDestroyHandler handle')

        // WS.destroy()
        popoutModel.events.setPopout('lock-screen')
        lockModel.events.setLockScreen({
            action: {
                text: 'Подключиться',
                _click: () => {
                    popoutModel.events.setPopout(null)
                    // userAPI.events.connectUser()
                    reSocketClose()
                }
            },
            alert: 'Ошибка подключения',
            message: 'Вы подключились к игре с другого устройства или вкладки. Необходимо завершить другую сессию, чтобы начать играть на этом устройстве.'
        })


    }

}

SessionDestroyHandler.EVENT = 'session-destroy'

export {
    SessionDestroyHandler
}