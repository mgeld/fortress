import { battleAPI, mapAPI } from "shared/api/events";
import { createEffect, sample } from "effector";
import { mapModel } from "entities/map";
import { Map } from "leaflet";
import { userModel } from "entities/user";
import { TLatLng } from "shared/types";
import { popoutModel } from "shared/ui/PopoutRoot";
import { TMapModes } from "shared/api/events/map";

const changeModeFx = createEffect(({
    source,
    mode
}: {
    source: {
        map: Map
        userPos: TLatLng
        areal: [TLatLng, TLatLng]
    },
    mode: TMapModes
}) => {

    function arenaFlyTo(zoom?: number) {
        source.map.flyTo(source.userPos, zoom)
    }

    const { areal, map } = source

    if (mode === 'select-place') {

        map.setMinZoom(6)
        map.setMaxBounds([[-90, -180], [90, 180]])

        arenaFlyTo(6)
        popoutModel.events.setPopout('battle-pending')
    }

    if (mode === 'invade') {
        map.setMinZoom(6)
        if (areal) {
            map.setMaxBounds([
                [areal[0][0] - 0.01, areal[0][1] - 0.01],
                [areal[1][0] + 0.01, areal[1][1] + 0.01],
            ])
        }
        arenaFlyTo(6)
        popoutModel.events.setPopout('battle-pending')
    }

    if (mode === 'battle') {
        source.map.setMinZoom(6)
        source.map.setMaxBounds([[-90, -180], [90, 180]])
        arenaFlyTo(6)
        popoutModel.events.setPopout('battle-pending')
    }
})

type TMap = {
    areal: [TLatLng, TLatLng]
    map: Map
    userPos: TLatLng
}

export const changeModeStatusListener = () => {
    sample({
        clock: mapAPI.events.setMapMode,
        source: {
            areal: userModel.$arealStore,
            map: mapModel.$mapStore,
            userPos: userModel.$userPositionStore,
        },
        filter: (source: {
            map: Map | null
            userPos: TLatLng | null
        }): source is TMap => source.map !== null,
        fn: (source, clock) => ({
            source,
            mode: clock
        }),
        target: changeModeFx
    })
}