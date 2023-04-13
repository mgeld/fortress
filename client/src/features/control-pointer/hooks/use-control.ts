import { attach, createEffect, createEvent, sample } from "effector";
import { userModel } from "entities/user";
import { useEffect, useRef } from "react";
import { IJoystickUpdateEvent } from "react-joystick-component/build/lib/Joystick";
import { direct } from "shared/api/direct";
import { effectorThrottle } from "shared/lib/effector-trottle";
import { TJoystickDirection, TLatLng } from "shared/types";

type TMovePointFx = {
    // source: {
    //     userId: number
    //     userPos: TLatLng
    // }
    payload: {
        direction: TJoystickDirection | null
    }
}
const movePointFx = createEffect(({ payload }: TMovePointFx) => {
    console.log('movePointFx')
    userModel.events.movePoint({ type: payload.direction })
})

const direction = createEvent<TJoystickDirection | null>()

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

export const useControl = () => {

    console.log('useControl')

    const moveId = useRef<ReturnType<typeof setTimeout>>()

    // const { pos, userId } = userModel.useUser()

    useEffect(() => {
        return () => {
            clearTimeout(moveId.current);
        }
    }, [])

    // useEffect(() => {

    //     console.log('useEffect position', pos)

    //     const timeId = setTimeout(() => direct(pos, userId), 1000)

    //     return () => {
    //         clearTimeout(timeId)
    //     }

    // }, [pos, userId])

    const moveControl = (e: IJoystickUpdateEvent) => {
        if (moveId.current) {
            clearTimeout(moveId.current);
            moveId.current = undefined
        }
        direction(e.direction)

        moveId.current = setInterval(() => direction(e.direction), 200)
    }

    const stopPoint = () => {
        if (moveId.current) {
            clearTimeout(moveId.current);
            moveId.current = undefined
        }
    }

    return {
        stopPoint,
        moveControl
    }
}