import { createEffect, createEvent, sample } from "effector";
import { TGunFire } from "entities/gun-fire/model/gun-fire";
import { pointerMapModel } from "entities/pointer";
import { TPointer } from "entities/pointer/model/pointer-map";
import { $userIdStore, $userPositionStore } from "entities/user/model/user";

import { IJoystickUpdateEvent } from "react-joystick-component/build/lib/Joystick";
import { firesAPI, pointersAPI } from "shared/api/events";
import { fire } from "shared/api/fire";
import { fromToDirectionPos } from "shared/lib/fromToDirectionPos";
import { isHitFireTarget } from "shared/lib/isHitFireTarget";
import { TJoystickDirection, TLatLng } from "shared/types";
import { comparePos } from "../lib/compare-pos";

const DISTANCE = 300

export type THitPointer = {
    userId: number
    pos: TLatLng
}

type TFire = {
    radius: number
    direction: TJoystickDirection | null
}
type THitPointersFxProps = {
    source: {
        pointers: TPointer[],
        userPos: TLatLng
    },
    fire: TFire
}

const hitPointersFx = createEffect(({
    source,
    fire
}: THitPointersFxProps) => {

    
    console.log('hitPointersFx')

    let hitPointer: THitPointer = {
        userId: 0,
        pos: [0, 0]
    }

    let to_pos = fromToDirectionPos(source.userPos, fire.direction, DISTANCE)

    source.pointers.sort(comparePos(fire.direction)).every(pointer => {
        let isFire = isHitFireTarget({
            from: source.userPos,
            to: to_pos,
            marker: pointer.pos,
            radius: fire.radius,
            direction: fire.direction
        })
        if (isFire) {
            hitPointer = {
                userId: pointer.userId,
                pos: pointer.pos
            }
            return false
        }
        return true
    })

    return hitPointer
})

type TFireControlFx = {
    user: {
        userId: number
        userPos: TLatLng
    }
    hitPointer: {
        params: {
            source: {
                pointers: TPointer[]
                userPos: TLatLng
            }
            fire: TFire
        }
        result: THitPointer
    }
}

const fireControlFx = createEffect(({
    user,
    hitPointer
}: TFireControlFx) => {

    console.log('fireControlFx')

    const FIRE_ID = Date.now()

    let to_pos = fromToDirectionPos(user.userPos, hitPointer.params.fire.direction, DISTANCE)

    let _fire: TGunFire = {
        id: FIRE_ID,
        from_pos: user.userPos,
        to_pos,
        direction: hitPointer.params.fire.direction
    }

    if (hitPointer.result.userId) _fire['hit_pos'] = hitPointer.result.pos

    firesAPI.events.addFire(_fire)

    fire(
        user.userPos,
        hitPointer.params.fire.direction,
        user.userId,
        hitPointer.result
    )

    setTimeout(() => {
        firesAPI.events.delFireById({ fire_id: FIRE_ID })
        if (hitPointer.result.userId) {
            pointersAPI.events.changeHealthPointer({ userId: hitPointer.result.userId, health: 10 })
        }
    }, 500)
})

const hitFireTarget = createEvent<TFire>()

sample({
    clock: hitFireTarget,
    source: { pointers: pointerMapModel.$pointersStore, userPos: $userPositionStore },
    fn: (source, clock) => ({ source, fire: clock }),
    target: hitPointersFx,
})

sample({
    clock: hitPointersFx.done,
    source: { userId: $userIdStore, userPos: $userPositionStore },
    fn: (user, hitPointer)=> ({ user, hitPointer }),
    target: fireControlFx
})

export const fireControl = (e: IJoystickUpdateEvent) => {

    console.log('fireControl')
    hitFireTarget({
        radius: 0.0004,
        direction: e.direction
    })
}
