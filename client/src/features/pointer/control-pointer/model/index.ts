import { shipModel } from "entities/ship"
import { arenaModel } from "entities/arena"
import { directAPI } from "shared/api/direct"
import { TBattleStatus } from "shared/api/events/battle"
import { TJoystickDirection, TLatLng } from "shared/types"
import { battleDirectAPI } from "shared/api/battle-direct"
import { createEffect, createEvent, sample } from "effector"

type TMovePointFx = {
    payload: {
        direction: TJoystickDirection | null
    }
}
const movePointFx = createEffect(({ payload }: TMovePointFx) => {
    shipModel.events.movePoint({ type: payload.direction })
})

export const direction = createEvent<TJoystickDirection | null>()
// export const battleDirection = createEvent<TJoystickDirection | null>()

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
    userPos: TLatLng
}

const directFx = createEffect((source: TSource) => {
    if (
        source.battleStatus === 'default' ||
        source.battleStatus === 'over'
    ) {
        directAPI(source.userPos)
    } else {
        battleDirectAPI(source.userPos)
    }
})

sample({
    clock: movePointFx.done,
    source: {
        battleStatus: arenaModel.$battleStatusStore,
        userPos: shipModel.$userPositionStore
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
