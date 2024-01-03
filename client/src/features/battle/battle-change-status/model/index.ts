import { Map } from "leaflet";
import { battleAPI } from "shared/api/events";
import { createEffect, sample } from "effector";
import { mapModel } from "entities/map";
import { TBattleStatus } from "shared/api/events/battle";
import { TLatLng } from "shared/types";
import { popoutModel } from "shared/ui/popout-root";

const changeBattleFx = createEffect(({
    source,
    battleStatus
}: {
    source: {
        map: Map
    },
    battleStatus: TBattleStatus
}) => {
    if (battleStatus === 'wait' || battleStatus === 'search') {
        popoutModel.events.setPopout('battle-pending')
    }
    else if (battleStatus === 'start') {
        setTimeout(() => {
            popoutModel.events.setPopout(null)
        }, 2000)
    }
    else if (battleStatus === 'over') {
        setTimeout(() => {
            popoutModel.events.setPopout('battle-over')
        }, 1000)
    }
})

type TMap = {
    map: Map
    userPos: TLatLng
}

export const changeBattleStatusListener = () => {
    sample({
        clock: battleAPI.events.setBattleStatus,
        source: {
            map: mapModel.$mapStore,
        },
        filter: (source: {
            map: Map | null
        }): source is TMap => source.map !== null,
        fn: (source, clock) => ({
            source,
            battleStatus: clock
        }),
        target: changeBattleFx
    })
}
