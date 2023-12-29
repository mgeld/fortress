import { Map } from "leaflet";
import { TLatLng } from "shared/types";
import { mapModel } from "entities/map";
import { shipModel } from "entities/ship";
import { createEffect, sample } from "effector";
import { TMapModes } from "shared/api/events/map";

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
        map.setMinZoom(15)
        map.setMaxBounds([
            [areal[0][0] - 0.1, areal[0][1] - 0.1],
            [areal[1][0] + 0.1, areal[1][1] + 0.1],
        ])
    } else {
        map.setMinZoom(14)
        map.setMaxBounds([
            [areal[0][0] - 0.02, areal[0][1] - 0.03],
            [areal[1][0] + 0.02, areal[1][1] + 0.03],
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