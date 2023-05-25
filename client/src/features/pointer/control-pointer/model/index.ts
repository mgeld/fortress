import { attach, createEffect, createEvent, sample } from "effector"
import { userModel } from "entities/user"
import { direct } from "shared/api/direct"
import { TJoystickDirection, TLatLng } from "shared/types"

type TMovePointFx = {
    payload: {
        direction: TJoystickDirection | null
    }
}
const movePointFx = createEffect(({ payload }: TMovePointFx) => {
    userModel.events.movePoint({ type: payload.direction })
})

export const direction = createEvent<TJoystickDirection | null>()

sample({
    clock: direction,
    fn: (direction) => ({
        payload: {
            direction
        }
    }),
    target: movePointFx
})

const directFx = createEffect((source: {
    userId: number
    userPos: TLatLng
}) => {
    direct(source.userPos, source.userId)
})

sample({
    clock: movePointFx,
    target: attach({
        source: {
            userId: userModel.$userIdStore,
            userPos: userModel.$userPositionStore
        },
        effect: directFx
    })
})


// effectorThrottle({
//     source: movePointFx.doneData,
//     timeout: 200,
//     target: attach({
//         source: {
//             userId: userModel.$userIdStore,
//             userPos: userModel.$userPositionStore
//         },
//         effect: directFx
//     })
// })
