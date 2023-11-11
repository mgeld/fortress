import { createEffect, createEvent, sample } from "effector";

import { userModel } from "entities/user";

import { cellToLatLng, latLngToCell } from "h3-js";
import { TLatLng } from "shared/types";
import { projectorAPI } from "shared/api/events";
import { beamAPI } from "shared/api/beam";
import { shipModel } from "entities/ship";

const hitSectorFx = createEffect((userPos: TLatLng) => {

    // Место, откуда крадем штурмовика
    const h3Index = latLngToCell(userPos[0], userPos[1], 9);
    const [lat, long] = cellToLatLng(h3Index);

    return {
        sectorId: h3Index,
        toPos: [lat, long] as TLatLng,
    }
})

type TProjectorControlFx = {
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

let timerId: ReturnType<typeof setTimeout> | null = null

const bootyControlFx = createEffect(({
    source,
    clock
}: TProjectorControlFx) => {

    // const BOOTY_ID: number = Date.now()

    // let _booty: TBooty = {
    //     id: BOOTY_ID,
    //     to_pos: clock.params,
    //     from_pos: clock.result.toPos,
    // }

    if (timerId) {
        clearTimeout(timerId)
        // projectorAPI.events.addBooty(_booty)
    }
    
    // else {
    //     setTimeout(() => projectorAPI.events.addBooty(_booty), 800)
    // }

    projectorAPI.events.setBeam({
        from_pos: clock.params,
        to_pos: clock.result.toPos,
    })

    setTimeout(() => beamAPI(
        clock.params,
        clock.result.toPos,
        clock.result.sectorId,
        source.userId,
    ), 800)

    timerId = setTimeout(() => {
        projectorAPI.events.setBeam(null)
        timerId = null
    }, 2800)

    // setTimeout(() => {
    //     projectorAPI.events.delBootyById({ booty_id: BOOTY_ID })
    // }, 2800)

})

sample({
    clock: hitSectorFx.done,
    source: {
        userId: userModel.$userIdStore,
    },
    fn: (source, clock) => ({ source, clock }),
    target: bootyControlFx
})

const attractBooty = createEvent()

sample({
    clock: attractBooty,
    source: shipModel.$userPositionStore,
    target: hitSectorFx,
})

// Точка входа
export const projectorControl = () => attractBooty()
