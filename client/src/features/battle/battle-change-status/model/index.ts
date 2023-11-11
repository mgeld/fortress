import { battleAPI } from "shared/api/events";
import { createEffect, sample } from "effector";
import { mapModel } from "entities/map";
import { TBattleStatus } from "shared/api/events/battle";
import { Map } from "leaflet";
import { TLatLng } from "shared/types";
import { popoutModel } from "shared/ui/popout-root";
import { shipModel } from "entities/ship";

const changeBattleFx = createEffect(({
    source,
    battleStatus
}: {
    source: {
        map: Map
        userPos: TLatLng
    },
    battleStatus: TBattleStatus
}) => {

    // function arenaFlyTo(zoom?: number) {
    //     source.map.flyTo(source.userPos, zoom)
    // }

    if (battleStatus === 'pending') {
        source.map.setMinZoom(6)
        // source.map.setMaxBounds([[-90,-180], [90, 180]])
        // arenaFlyTo(6)
        popoutModel.events.setPopout('battle-pending')
    }

    else if (battleStatus === 'start') {
        // arenaFlyTo(15)
        setTimeout(() => {
            // source.map.setMinZoom(15)
            popoutModel.events.setPopout(null)
        }, 2000)
    }

    else if (battleStatus === 'over') {
        // arenaFlyTo(13)
        popoutModel.events.setPopout('battle-over')
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
            userPos: shipModel.$userPositionStore,
        },
        filter: (source: {
            map: Map | null
            userPos: TLatLng | null
        }): source is TMap => source.map !== null,
        fn: (source, clock) => ({
            source,
            battleStatus: clock
        }),
        target: changeBattleFx
    })
}
