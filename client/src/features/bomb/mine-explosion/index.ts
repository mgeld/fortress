import { createEffect, sample } from "effector"
import { userModel } from "entities/user"
import { bombsAPI, pointersAPI, userAPI } from "shared/api/events"
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
            text: 'Подрыв на мине!',
            t: 6
        })
        userAPI.events.changeHealth(clock.damage)
        // userAPI.events.changeHealth(1)

        if (source.userHealth - clock.damage < 1) setTimeout(() => popoutModel.events.setPopout('user-dead'), 1000)

    } else {
        pointersAPI.events.changeHealthPointer({
            // health: clock.damage,
            health: clock.damage,
            userId: clock.hitUserId
        })
    }

})

export const isBombHitMe = () => {
    sample({
        clock: bombsAPI.events.hitBombInTarget,
        source: {
            userId: userModel.$userIdStore,
            userHealth: userModel.$userHealthStore,
        },
        fn: (source, clock) => ({ clock, source }),
        target: changeHealthFx
    })
}