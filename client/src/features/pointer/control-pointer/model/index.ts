import { attach, createEffect, createEvent, sample } from "effector"
import { arenaModel } from "entities/arena"
import { userModel } from "entities/user"
import { battleDirectAPI } from "shared/api/battle-direct"
import { directAPI } from "shared/api/direct"
import { TBattleStatus } from "shared/api/events/battle"
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
export const battleDirection = createEvent<TJoystickDirection | null>()

sample({
    clock: direction,
    fn: (direction) => ({
        payload: {
            direction
        }
    }),
    target: movePointFx
})

type TSource = {
    battleStatus: TBattleStatus
    userId: number
    userPos: TLatLng
}

const directFx = createEffect((source: TSource) => {
    if (
        source.battleStatus === 'default' ||
        source.battleStatus === 'over'
    ) {
        directAPI(source.userPos, source.userId)
    } else {
        battleDirectAPI(source.userPos, source.userId)
    }
})

sample({
    clock: movePointFx.done,
    source: {
        battleStatus: arenaModel.$battleStatusStore,
        userId: userModel.$userIdStore,
        userPos: userModel.$userPositionStore
    },
    // filter: (source): source is TSource => source.userPos !== null,
    target: directFx
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
