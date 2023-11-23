import { createEffect, sample } from "effector";
import { mapModel } from "entities/map";
import { shipModel } from "entities/ship";
import { Map } from "leaflet";
import { TLatLng } from "shared/types";

const setMaxBoundsFx = createEffect(({
    map,
    areal
}: {
    map: Map | null
    areal: TAreal
}) => {
    console.log('Блядь, работает!')
    if(!map) return
    // map.setMaxBounds([[-90,-180], [90,180]])
    setTimeout(() => {})
    map.setMaxBounds([
        [areal[0][0] - 0.01, areal[0][1] - 0.01],
        [areal[1][0] + 0.01, areal[1][1] + 0.01],
    ])
})

type TAreal = [TLatLng, TLatLng]

export const setMaxBoundsListener = () => {
    sample({
        clock: shipModel.$arealStore,
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