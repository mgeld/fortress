import { battleAPI } from "shared/api/events";
import { createEffect, sample } from "effector";
import { mapModel } from "entities/map";
import { TBattleStatus } from "shared/api/events/battle";
import { Map } from "leaflet";
import { userModel } from "entities/user";
import { TLatLng } from "shared/types";

const changeBattleFx = createEffect(({
    source,
    battleStatus
}: {
    source: {
        map: Map | null
        userPos: TLatLng
    },
    battleStatus: TBattleStatus
}) => {

    function arenaFlyTo(zoomChange?: number) {
        if (!source.map) return
        source.map.flyTo(source.userPos, source.map.getZoom() - (zoomChange || 0))
    }

    console.log('////////////// battleStatus', battleStatus)

    if (battleStatus === 'pending') {
        arenaFlyTo()
    }

    else if (battleStatus === 'over') {
        arenaFlyTo(2)
    }
})

export const changeBattleStatusListener = () => {
    console.log('..........changeBattleStatusListener')
    sample({
        clock: battleAPI.events.setBattleStatus,
        source: {
            map: mapModel.$mapStore,
            userPos: userModel.$userPositionStore,
        },
        fn: (source, clock) => ({ source, battleStatus: clock }),
        target: changeBattleFx
    })
}
