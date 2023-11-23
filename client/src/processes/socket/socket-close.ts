import { createEffect, sample } from "effector"
import { socketModel } from "shared/api/socket"
import { TSocketStatus } from "shared/api/socket/model"
import { popoutModel } from "shared/ui/popout-root"

export const socketCloseFx = createEffect((status: TSocketStatus) => {

    console.log('PPPPPPPPPPPPPPPPPPPPPPPPPPPP socketCloseFx status', status)

    popoutModel.events.setPopout(null)

    console.log('--socketCloseFx /////// status', status)

    if (status === 'close')
        setTimeout(() => {
            popoutModel.events.setPopout('lock-screen')
        }, 300)

})

sample({
    clock: socketModel.events.reSocket,
    source: socketModel.$socketStatus,
    target: socketCloseFx
})

export const reSocketClose = () => socketModel.events.reSocket()