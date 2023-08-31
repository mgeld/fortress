import { createEffect, createEvent, sample } from "effector";
import { TFire } from "entities/fire/model/fire";
import { pointerMapModel } from "entities/pointer";
import { TPointer } from "entities/pointer/model/pointer-map";
import { userModel } from "entities/user";

import { fireAPI } from "shared/api/fire";
import { comparePos } from "../lib/compare-pos";
import { firesAPI, pointersAPI } from "shared/api/events";
import { TJoystickDirection, TLatLng } from "shared/types";
import { isHitFireTarget } from "shared/lib/isHitFireTarget";
import { fromToDirectionPos } from "shared/lib/fromToDirectionPos";
import { IJoystickUpdateEvent } from "react-joystick-component/build/lib/Joystick";

import { THitPointer } from '@ctypes/model'
import { weaponModel } from "entities/weapon"
import { WeaponType } from "entities/weapon/lib/gun"
import { arenaModel } from "entities/arena";
import { TBattleStatus } from "shared/api/events/battle";
import { battleFireAPI } from "shared/api/battle-fire";
import { TWeaponStore } from "entities/weapon/model/weapon";

//--------

type TFireDirection = {
    direction: TJoystickDirection | null
}

type THitPointersFxProps = {
    source: {
        pointers: TPointer[]
        userPos: TLatLng
        usedWeapon: TWeaponStore | null
        featureWeapon: WeaponType | null
    },
    fire: TFireDirection
}

const hitPointersFx = createEffect(({
    source,
    fire
}: THitPointersFxProps) => {

    let hitPointer: THitPointer = {
        userId: 0,
        pos: [0, 0]
    }

    // Место, куда попадёт пуля (моя позиция, направление, расстояние)
    let to_pos: TLatLng = fromToDirectionPos(source.userPos, fire.direction, source.featureWeapon?.distance || 0)

    source.pointers.sort(comparePos(fire.direction)).every(pointer => {

        if(pointer.health < 1) return true

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
    source: {
        userId: number
        battleStatus: TBattleStatus
    }
    clock: {
        params: THitPointersFxProps
        result: {
            hitPointer: THitPointer
            toPos: TLatLng
            featureWeapon: WeaponType | null
            usedWeapon: TWeaponStore | null
        }
    }
}

const fireControlFx = createEffect(({
    source,
    clock
}: TFireControlFx) => {

    const FIRE_ID = Date.now()

    let _fire: TFire = {
        id: FIRE_ID,
        from_pos: clock.params.source.userPos,
        to_pos: clock.result.toPos,
        direction: clock.params.fire.direction
    }

    // Если попало, то добавляем ещё место пользователя, в которого попали
    // Или другими словами место попадания
    if (clock.result.hitPointer.userId) {
        _fire['hit_pos'] = clock.result.hitPointer.pos
    }

    firesAPI.events.addFire(_fire)

    if (clock.result.usedWeapon?.id) {
        if (
            source.battleStatus === 'default' ||
            source.battleStatus === 'over'
        ) {
            fireAPI(
                clock.params.source.userPos,
                clock.params.fire.direction,
                source.userId,
                clock.result.hitPointer,
                clock.result.usedWeapon.id
            )
        } else {
            battleFireAPI(
                clock.params.source.userPos,
                clock.params.fire.direction,
                source.userId,
                clock.result.hitPointer,
                clock.result.usedWeapon.id
            )
        }

    }

    setTimeout(() => {
        firesAPI.events.delFireById({ fire_id: FIRE_ID })
        if (clock.result.hitPointer.userId) {
            pointersAPI.events.changeHealthPointer({
                health: clock.result.featureWeapon?.damage || 0,
                userId: clock.result.hitPointer.userId,
            })
        }
    }, 550)

})

sample({
    clock: hitPointersFx.done,
    source: {
        battleStatus: arenaModel.$battleStatusStore,
        userId: userModel.$userIdStore,
        // userPos: userModel.$userPositionStore,
    },
    fn: (source, clock) => ({ source, clock }),
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
