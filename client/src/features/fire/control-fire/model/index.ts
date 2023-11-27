import { createEffect, createEvent, sample } from "effector";
import { TFire } from "entities/fire/model/fire";
import { pointerMapModel } from "entities/pointer";
import { userModel } from "entities/user";

import { fireAPI } from "shared/api/fire";
import { comparePos } from "../lib/compare-pos";
import { firesAPI, pointersAPI } from "shared/api/events";
import { TJoystickDirection, TLatLng } from "shared/types";
import { isHitFireTarget } from "shared/lib/isHitFireTarget";
import { fromToDirectionPos } from "shared/lib/fromToDirectionPos";
import { IJoystickUpdateEvent } from "react-joystick-component/build/lib/Joystick";

import { THitPointer, TPointer } from '@ctypes/model'
import { weaponModel } from "entities/weapon"
import { arenaModel } from "entities/arena";
import { TBattleStatus } from "shared/api/events/battle";
import { battleFireAPI } from "shared/api/battle-fire";
import { shipModel } from "entities/ship";

//--------

type TFireDirection = {
    direction: TJoystickDirection | null
}

type THitPointersFxProps = {
    source: {
        pointers: TPointer[]
        userPos: TLatLng
        distance: number
    },
    fire: TFireDirection
}

type TFireControlFx = {
    source: {
        battleStatus: TBattleStatus
        gunPower: number
    }
    clock: {
        params: THitPointersFxProps
        result: {
            hitPointer: THitPointer
            toPos: TLatLng
            distance: number
        }
    }
}

const hitPointersFx = createEffect(({
    source,
    fire
}: THitPointersFxProps) => {

    let hitPointer: THitPointer = {
        health: 0,
        userId: 0,
        pos: [0, 0]
    }

    // Место, куда попадёт пуля (моя позиция, направление, расстояние)
    let to_pos: TLatLng = fromToDirectionPos(
        source.userPos,
        fire.direction,
        source.distance
    )

    source.pointers.sort(comparePos(fire.direction)).every(pointer => {

        if (pointer.health < 1) return true

        let isFire = isHitFireTarget({
            from: source.userPos,
            to: to_pos,
            marker: pointer.pos,
            radius: 0.0004,
            direction: fire.direction
        })
        if (isFire) {
            hitPointer = {
                health: pointer.health,
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
        distance: source.distance
    }
})

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

    if (clock.result.distance) {
        if (
            source.battleStatus === 'default' ||
            source.battleStatus === 'over'
        ) {
            fireAPI(
                clock.params.source.userPos,
                clock.result.toPos,
                clock.params.fire.direction,
                clock.result.hitPointer
            )
        } else {
            battleFireAPI(
                clock.params.source.userPos,
                clock.result.toPos,
                clock.params.fire.direction,
                clock.result.hitPointer
            )
        }

    }

    setTimeout(() => {
        firesAPI.events.delFireById({ fire_id: FIRE_ID })
        if (clock.result.hitPointer.userId) {

            // if(clock.result.hitPointer.health < 1) return

            pointersAPI.events.changeHealthPointer({
                health: source.gunPower,
                userId: clock.result.hitPointer.userId,
            })
        }
    }, 550)

})

sample({
    clock: hitPointersFx.done,
    source: {
        userId: userModel.$userIdStore,
        battleStatus: arenaModel.$battleStatusStore,
        gunPower: weaponModel.$gunPowerStore,
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
        userPos: shipModel.$userPositionStore,
        distance: weaponModel.$gunDistanceStore,
    },
    fn: (source, clock) => ({ source, fire: clock }),
    target: hitPointersFx,
})

// Точка входа
export const fireControl = (e: IJoystickUpdateEvent) => hitFireOutTarget({
    direction: e.direction
})
