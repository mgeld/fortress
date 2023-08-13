import { createEffect, sample } from "effector"
import { userModel } from "entities/user"
import { firesAPI, pointersAPI, userAPI } from "shared/api/events"
import { THealthChange } from "shared/api/events/fires"
import { popoutModel } from "shared/ui/PopoutRoot"
import { snackbarModel } from "shared/ui/Snackbar"

type TChangeHealthFxProps = {
    source: {
        userId: number
        userHealth: number
    }
    clock: THealthChange
}
export const changeHealthFx = createEffect(({ source, clock }: TChangeHealthFxProps) => {

    if (source.userId === clock.hitUserId) {
        snackbarModel.events.newToast({
            text: 'Вас атакуют!',
            t: 5
        })
        userAPI.events.changeHealth(clock.damage)

        if (source.userHealth - clock.damage < 1) setTimeout(() => popoutModel.events.setPopout('user-dead'), 1000)

    } else {
        pointersAPI.events.changeHealthPointer({
            health: clock.damage,
            userId: clock.hitUserId
        })
    }

})

export const isFireHitMe = () => {
    sample({
        clock: firesAPI.events.hitFireInTarget,
        source: {
            userId: userModel.$userIdStore,
            userHealth: userModel.$userHealthStore,
        },
        fn: (source, clock) => ({ clock, source }),
        target: changeHealthFx
    })
}