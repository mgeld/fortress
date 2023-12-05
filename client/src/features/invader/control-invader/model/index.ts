import { createEffect, createEvent, sample } from "effector";

// import { userModel } from "entities/user";
import { stormModel } from "entities/storm-corps";

import { cellToLatLng, latLngToCell } from "h3-js";
import { TTake } from "entities/invader/model/invader";
import { takeAPI } from "shared/api/take";
import { TLatLng } from "shared/types";
import { stormAPI, takesAPI } from "shared/api/events";
import { snackbarModel } from "shared/ui/snackbar";
import { throttle } from "shared/lib/throttle";
import { shipModel } from "entities/ship";
import { arenaModel } from "entities/arena";
import { TBattleStatus } from "shared/api/events/battle";
import { battleTakeAPI } from "shared/api/battle-take";

//--------

type THitTakeSectorFxProps = {
    userPos: TLatLng
    stormInvaders: number
}

type TResult = {
    userPos: TLatLng
    sectorId: string
    toPos: TLatLng
}

const hitSectorFx = createEffect((source: THitTakeSectorFxProps): TResult | null => {

    if (source.stormInvaders === 0) {
        snackbarModel.events.newToast({
            text: 'Штурмовики закончились!',
            t: 9
        })
        return null
    }

    stormAPI.events.setStormInvaders(source.stormInvaders - 1)

    // Место, куда попадёт захватчик
    const h3Index = latLngToCell(source.userPos[0], source.userPos[1], 9);
    const [lat, long] = cellToLatLng(h3Index);

    return {
        userPos: source.userPos,
        sectorId: h3Index,
        toPos: [lat, long] as TLatLng,
    }
})

type TInvaderControlFx = {
    source: {
        battleStatus: TBattleStatus
    }
    clock: TResult | null
}

const invaderControlFx = createEffect(({
    source,
    clock
}: TInvaderControlFx) => {
    if(!clock) return

    const TAKE_ID: number = Date.now()

    let _invader: TTake = {
        id: TAKE_ID,
        from_pos: clock.userPos,
        to_pos: clock.toPos,
    }

    takesAPI.events.addTake(_invader)
    if (
        source.battleStatus === 'default' ||
        source.battleStatus === 'over'
    ) {
        takeAPI(
            clock.toPos,
            clock.sectorId
        )
    } else {

        battleTakeAPI(
            clock.toPos,
            clock.sectorId
        )
    }

    setTimeout(() => {
        takesAPI.events.delTakeById({ take_id: TAKE_ID })
    }, 2000)

})

sample({
    clock: hitSectorFx.doneData,
    source: {
        battleStatus: arenaModel.$battleStatusStore
    },
    fn: (source, clock) => ({ source, clock }),
    // filter: (_, clock: TResult | null): clock is TResult => clock !== null,
    // fn: (clock) => (clock),
    target: invaderControlFx
})

/*
*/

const hitTakeOutSector = createEvent()

sample({
    clock: hitTakeOutSector,
    source: {
        userPos: shipModel.$userPositionStore,
        stormInvaders: stormModel.$stormInvadersStore
    },
    target: hitSectorFx,
})

// Точка входа
export const invaderControl = throttle(hitTakeOutSector, 500)
