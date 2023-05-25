import { createEffect, sample } from "effector"
import { userModel } from "entities/user"
import { firesAPI, pointersAPI, userAPI } from "shared/api/events"
import { THealthChange } from "shared/api/events/fires"

const { hitFireInTarget } = firesAPI.events

console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa')

type TChangeHealthFxProps = {
    source: { userId: number }
    clock: THealthChange
}
export const changeHealthFx = createEffect(({ source, clock }: TChangeHealthFxProps) => {

    console.log('source.userId', source.userId)
    console.log('clock.hitUserId', clock.hitUserId)

    if (source.userId === clock.hitUserId) {
        userAPI.events.changeHealth(clock.damage)
    } else {
        pointersAPI.events.changeHealthPointer({
            health: clock.damage,
            userId: clock.hitUserId
        })
    }
})