import { createEffect, createEvent, sample } from "effector";

import { userModel } from "entities/user";

import { IJoystickUpdateEvent } from "react-joystick-component/build/lib/Joystick";

import { cellToLatLng, latLngToCell } from "h3-js";
import { TTake } from "entities/invader/model/invader";
import { takeAPI } from "shared/api/take";
import { TLatLng } from "shared/types";
import { takesAPI } from "shared/api/events";

//--------

// type THitTakeSectorFxProps = {
//     userPos: TLatLng
// }

const hitSectorFx = createEffect((userPos: TLatLng) => {

    // Место, куда попадёт захватчик
    const h3Index = latLngToCell(userPos[0], userPos[1], 9);
    const [lat, long] = cellToLatLng(h3Index);

    return {
        sectorId: h3Index,
        toPos: [lat, long] as TLatLng,
    }
})

type TInvaderControlFx = {
    source: {
        userId: number
    }
    clock: {
        params: TLatLng
        result: {
            sectorId: string
            toPos: TLatLng
        }
    }
}

const invaderControlFx = createEffect(({
    source,
    clock
}: TInvaderControlFx) => {

    const TAKE_ID: number = Date.now()

    let _invader: TTake = {
        id: TAKE_ID,
        from_pos: clock.params,
        to_pos: clock.result.toPos,
    }

    takesAPI.events.addTake(_invader)

    takeAPI(
        clock.params,
        clock.result.toPos,
        clock.result.sectorId,
        source.userId,
    )

    setTimeout(() => {
        takesAPI.events.delTakeById({ take_id: TAKE_ID })
    }, 2000)

})

sample({
    clock: hitSectorFx.done,
    source: {
        userId: userModel.$userIdStore,
    },
    fn: (source, clock) => ({ source, clock }),
    target: invaderControlFx
})


/*
*/

const hitTakeOutSector = createEvent()

sample({
    clock: hitTakeOutSector,
    source: userModel.$userPositionStore,
    // filter: (userPos): userPos is TLatLng => userPos !== null,
    target: hitSectorFx,
})

// Точка входа
export const invaderControl = () => hitTakeOutSector()
