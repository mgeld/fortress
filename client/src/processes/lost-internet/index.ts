import { lockModel } from "shared/ui/lock-screen"
import { popoutModel } from "shared/ui/popout-root"

export const lostInternet = () => {
    popoutModel.events.setPopout('lock-screen')
    lockModel.events.setLockScreen({
        action: {
            text: 'Обновить',
            _click: () => {
                popoutModel.events.setPopout(null)
                setTimeout(() => {
                    if (window.navigator.onLine) {
                    } else {
                        popoutModel.events.setPopout('lock-screen')
                    }
                }, 300)

            }
        },
        alert: 'Соединение потеряно',
        message: 'Возникли проблемы с подключением к интернету'
    })
}