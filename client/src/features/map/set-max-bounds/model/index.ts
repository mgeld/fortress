import { createEffect, sample } from "effector";
import { mapModel } from "entities/map";
import { $arealStore } from "entities/user/model/user";
import { LatLngBounds, Map } from "leaflet";
import { TLatLng } from "shared/types";

const setMaxBoundsFx = createEffect(({
    map,
    areal
}: {
    map: Map | null
    areal: TAreal
}) => {
    if(!map) return
    // map.setMaxBounds([[-90,-180], [90,180]])
    map.setMaxBounds([
        [areal[0][0] - 0.01, areal[0][1] - 0.01],
        [areal[1][0] + 0.01, areal[1][1] + 0.01],
    ])
})

type TAreal = [TLatLng, TLatLng]

export const setMaxBoundsListener = () => {
    sample({
        clock: $arealStore,
        source: {
            map: mapModel.$mapStore,

        },
        filter: (source, areal): areal is TAreal => areal !== null,
        fn: (source, areal) => ({
            map: source.map,
            areal: areal!
        }),
        target: setMaxBoundsFx
    })

}