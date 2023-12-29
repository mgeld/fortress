import { createEffect, createEvent, sample } from "effector"
import { battleLeaveAPI } from "shared/api/battle-leave"

export const battleLeave = createEvent()

sample({
    clock: battleLeave,
    target: createEffect(() => {
        battleLeaveAPI()
    })
})