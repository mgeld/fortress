import { createEffect, sample } from "effector";
import { mapModel } from "entities/map";
import { shipModel } from "entities/ship";
import { Map } from "leaflet";
import { TMapModes } from "shared/api/events/map";
import { TLatLng } from "shared/types";

const setMaxBoundsFx = createEffect(({
    map,
    areal,
    mode
}: {
    map: Map | null
    areal: TAreal,
    mode: TMapModes | null
}) => {
    if (!map) return

    if (mode === 'battle') {
        map.setMaxBounds([
            [areal[0][0] - 0.1, areal[0][1] - 0.1],
            [areal[1][0] + 0.1, areal[1][1] + 0.1],
        ])
    } else {
        map.setMaxBounds([
            [areal[0][0] - 0.01, areal[0][1] - 0.01],
            [areal[1][0] + 0.01, areal[1][1] + 0.01],
        ])
    }
})

type TAreal = [TLatLng, TLatLng]

export const setMaxBoundsListener = () => {
    sample({
        clock: shipModel.$arealStore,
        source: {
            map: mapModel.$mapStore,
            mode: mapModel.$mapMode,
        },
        filter: (source, areal): areal is TAreal => areal !== null,
        fn: (source, areal) => ({
            map: source.map,
            mode: source.mode,
            areal: areal!
        }),
        target: setMaxBoundsFx
    })

}