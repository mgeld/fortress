import { battleAPI } from "shared/api/events";
import { createEffect, sample } from "effector";
import { mapModel } from "entities/map";
import { TBattleStatus } from "shared/api/events/battle";
import { Map } from "leaflet";
import { userModel } from "entities/user";
import { TLatLng } from "shared/types";
import { popoutModel } from "shared/ui/PopoutRoot";

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

    function arenaFlyTo(zoom?: number) {
        // if (!source.map) return
        source.map.flyTo(source.userPos, zoom)
        // source.map.setZoom(1)
    }

    if (battleStatus === 'pending') {
        // setTimeout(() => arenaFlyTo(3), 1000)
        arenaFlyTo(3)
        popoutModel.events.setPopout('battle-pending')
    }

    else if (battleStatus === 'start') {
        arenaFlyTo(15)
        setTimeout(() => popoutModel.events.setPopout(null), 2000)
    }

    else if (battleStatus === 'over') {
        arenaFlyTo(13)
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
            userPos: userModel.$userPositionStore,
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
