import { sectorsAPI } from "shared/api/events";
import { Handler } from "..";
import { TTakeHit } from '@ctypes/socket/server-to-client'
import { snackbarModel } from "shared/ui/Snackbar";

let timeId: ReturnType<typeof setTimeout>

class TakeHitHandler extends Handler {
    handle(message: TTakeHit) {
        sectorsAPI.events.setTakeFort(message.payload)

        switch (message.payload.status) {
            case 'defense':
                if (message.payload.defenders === 1) {
                    snackbarModel.events.newToast({
                        text: 'Сектор захвачен!',
                        t: 1
                    })
                } else
                    snackbarModel.events.newToast({
                        text: 'На сектор добавлен новый защитник!',
                        t: 2
                    })
                break;
            case 'victory':
                if (message.payload.defenders === 0)
                    snackbarModel.events.newToast({
                        text: 'Сектор захвачен!',
                        t: 1
                    })
                else
                    snackbarModel.events.newToast({
                        text: 'Уничтожен защитник форта!',
                        t: 3
                    })
                break;
            case 'defeat':
                snackbarModel.events.newToast({
                    text: 'Захватчик погиб!',
                    t: 4
                })
                break;
        }

        if (timeId) {
            clearTimeout(timeId)
        }

        timeId = setTimeout(() => {
            sectorsAPI.events.setTakeFort(null)
        }, 6000)
    }
}

TakeHitHandler.EVENT = 'take-hit'

export {
    TakeHitHandler
}