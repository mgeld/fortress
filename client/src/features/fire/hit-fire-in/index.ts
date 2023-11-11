import { createEffect, sample } from "effector"
// import { shipModel } from "entities/ship"
import { userModel } from "entities/user"
import { firesAPI, pointersAPI, shipAPI } from "shared/api/events"
import { THealthChange } from "shared/api/events/fires"
import { popoutModel } from "shared/ui/popout-root"
import { snackbarModel } from "shared/ui/snackbar"

type TChangeHealthFxProps = {
    source: {
        userId: number
        // userHealth: number
    }
    clock: THealthChange
}
export const changeHealthFx = createEffect(({ source, clock }: TChangeHealthFxProps) => {

    if (source.userId === clock.hitUserId) {
        snackbarModel.events.newToast({
            text: 'Вас атакуют!',
            t: 5
        })
        shipAPI.events.setHealth(clock.health)

        // if (source.userHealth - clock.damage < 1) setTimeout(() => popoutModel.events.setPopout('user-dead'), 1000)
        if (clock.health < 1) setTimeout(() => popoutModel.events.setPopout('user-dead'), 1000)

    } else {
        pointersAPI.events.setHealthPointer({
            health: clock.health,
            userId: clock.hitUserId
        })
    }

})

export const isFireHitMe = () => {
    sample({
        clock: firesAPI.events.hitFireInTarget,
        source: {
            userId: userModel.$userIdStore,
            // userHealth: shipModel.$userHealthStore,
        },
        fn: (source, clock) => ({ clock, source }),
        target: changeHealthFx
    })
}