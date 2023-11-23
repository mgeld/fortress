import { Handler } from "..";
import { TLimit } from '@ctypes/socket/server-to-client'
import { userEvents } from "features/user/connect-user";
import { lockModel } from "shared/ui/lock-screen";
import { popoutModel } from "shared/ui/popout-root";

class SessionHandler extends Handler {
    handle(message: TLimit) {

        console.log('SessionHandler message', message)
        popoutModel.events.setPopout('lock-screen')
        lockModel.events.setLockScreen({
            action: {
                text: 'Обновить',
                _click: () => {
                    popoutModel.events.setPopout(null)
                    const url = window.location.search;
                    userEvents.events.connectUser(url)
                }
            },
            alert: 'Ошибка подключения',
            message: 'Вы уже подключены к игре. Необходимо завершить другую сессию, чтобы начать играть тут'
        })


    }

}

SessionHandler.EVENT = 'session'

export {
    SessionHandler
}