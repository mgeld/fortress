import { createEffect, sample } from "effector"
import { socketModel } from "shared/api/socket"
import { TSocketStatus } from "shared/api/socket/model"
import { popoutModel } from "shared/ui/popout-root"
import { WS } from "."

export const socketCloseFx = createEffect((status: TSocketStatus) => {
    popoutModel.events.setPopout(null)

    if (status === 'close') {
        setTimeout(() => {
            popoutModel.events.setPopout('lock-screen')
        }, 300)
    }

})

sample({
    clock: socketModel.events.reSocket,
    source: socketModel.$socketStatus,
    target: socketCloseFx
})

export const reSocketClose = () => {
    WS.connect()
    setTimeout(() => socketModel.events.reSocket(), 300)
}