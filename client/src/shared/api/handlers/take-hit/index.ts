import { sectorsAPI } from "shared/api/events";
import { Handler } from "..";
import { TTakeHit } from '@ctypes/socket/server-to-client'
import { snackbarModel } from "shared/ui/snackbar";

let timeId: ReturnType<typeof setTimeout>

class TakeHitHandler extends Handler {
    handle(message: TTakeHit) {

        console.log('TakeHitHandler message', message)

        const hit = message.payload.hit
        sectorsAPI.events.setTakeFort(hit)

        switch (hit.status) {
            case 'defense':
                if (hit.defenders === 1) {
                    // zoneModel.events.addSector()
                    // snackbarModel.events.newToast({
                    //     text: 'Сектор захвачен!',
                    //     t: 1
                    // })
                } else
                    snackbarModel.events.newToast({
                        text: 'На сектор добавлен новый защитник!',
                        t: 2
                    })
                break;
            case 'victory':
                if (hit.defenders === 0)
                    snackbarModel.events.newToast({
                        text: 'Сектор захвачен!',
                        t: 1
                    })
                else
                    snackbarModel.events.newToast({
                        text: 'Уничтожен страж форта!',
                        t: 3
                    })
                break;
            case 'defeat':
                snackbarModel.events.newToast({
                    text: 'Ваш штурмовик уничтожен!',
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