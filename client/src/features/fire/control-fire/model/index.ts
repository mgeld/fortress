import { createEffect, createEvent, sample } from "effector";
import { TFire } from "entities/fire/model/fire";
import { pointerMapModel } from "entities/pointer";
import { TPointer } from "entities/pointer/model/pointer-map";
import { userModel } from "entities/user";

import { fire } from "shared/api/fire";
import { comparePos } from "../lib/compare-pos";
import { firesAPI, pointersAPI } from "shared/api/events";
import { TJoystickDirection, TLatLng } from "shared/types";
import { isHitFireTarget } from "shared/lib/isHitFireTarget";
import { fromToDirectionPos } from "shared/lib/fromToDirectionPos";
import { IJoystickUpdateEvent } from "react-joystick-component/build/lib/Joystick";

import { THitPointer, TWeapon } from '@ctypes/model'
import { weaponModel } from "entities/weapon"
import { WeaponType } from "entities/weapon/lib/gun"

//--------

type TFireDirection = {
    direction: TJoystickDirection | null
}

type THitPointersFxProps = {
    source: {
        pointers: TPointer[]
        userPos: TLatLng
        usedWeapon: TWeapon | null
        featureWeapon: WeaponType | null
    },
    fire: TFireDirection
}

const hitPointersFx = createEffect(({
    source,
    fire
}: THitPointersFxProps) => {

    console.log('hitPointersFx source.featureWeapon.distance', source.featureWeapon?.distance)

    let hitPointer: THitPointer = {
        userId: 0,
        pos: [0, 0]
    }

    // Место, куда попадёт пуля (моя позиция, направление, расстояние)
    let to_pos: TLatLng = fromToDirectionPos(source.userPos, fire.direction, source.featureWeapon?.distance || 0)

    source.pointers.sort(comparePos(fire.direction)).every(pointer => {
        let isFire = isHitFireTarget({
            from: source.userPos,
            to: to_pos,
            marker: pointer.pos,
            radius: source.featureWeapon?.radius || 0,
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

    return {
        hitPointer,
        toPos: to_pos,
        featureWeapon: source.featureWeapon,
        usedWeapon: source.usedWeapon
    }
})

type TFireControlFx = {
    user: {
        userId: number
        userPos: TLatLng
    }
    clock: {
        params: {
            source: {
                pointers: TPointer[]
                userPos: TLatLng
            }
            fire: TFireDirection
        }
        result: {
            hitPointer: THitPointer
            toPos: TLatLng
            featureWeapon: WeaponType | null
            usedWeapon: TWeapon | null
        }
    }
}

const fireControlFx = createEffect(({
    user,
    clock
}: TFireControlFx) => {

    console.log('fireControlFx.....................................')

    const FIRE_ID = Date.now()

    // let to_pos = fromToDirectionPos(user.userPos, hitPointer.params.fire.direction, DISTANCE)

    let _fire: TFire = {
        id: FIRE_ID,
        from_pos: user.userPos,
        to_pos: clock.result.toPos,
        direction: clock.params.fire.direction
    }

    // Если попало, то добавляем ещё место пользователя, в которого попали
    // Или другими словами место попадания
    if (clock.result.hitPointer.userId) {
        _fire['hit_pos'] = clock.result.hitPointer.pos
    }

    firesAPI.events.addFire(_fire)

    clock.result.usedWeapon?.id && fire(
        user.userPos,
        clock.params.fire.direction,
        user.userId,
        clock.result.hitPointer,
        clock.result.usedWeapon.id
    )

    setTimeout(() => {
        firesAPI.events.delFireById({ fire_id: FIRE_ID })
        if (clock.result.hitPointer.userId) {
            pointersAPI.events.changeHealthPointer({
                health: clock.result.featureWeapon?.damage || 0,
                userId: clock.result.hitPointer.userId,
            })
        }
    }, 500)

})

sample({
    clock: hitPointersFx.done,
    source: {
        userId: userModel.$userIdStore,
        userPos: userModel.$userPositionStore,
    },
    fn: (user, clock) => ({ user, clock }),
    target: fireControlFx
})


/*
*/

const hitFireOutTarget = createEvent<TFireDirection>()

sample({
    clock: hitFireOutTarget,
    source: {
        pointers: pointerMapModel.$pointersStore,
        userPos: userModel.$userPositionStore,
        usedWeapon: weaponModel.$usedWeaponStore,
        featureWeapon: weaponModel.$featureWeaponStore,
    },
    fn: (source, clock) => ({ source, fire: clock }),
    target: hitPointersFx,
})

// Точка входа
export const fireControl = (e: IJoystickUpdateEvent) => hitFireOutTarget({
    direction: e.direction
})
