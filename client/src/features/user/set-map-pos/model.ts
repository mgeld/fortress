import { createEffect, sample } from "effector"
import { Areal } from "entities/areal/model"
import { mapModel } from "entities/map"
import { shipModel } from "entities/ship"
import { Map } from "leaflet"
import { shipAPI } from "shared/api/events"
import { TLatLng } from "shared/types"
type TMap = {
    map: Map
}

const setPosFx = createEffect(({
    source,
    pos
}: {
    source: {
        map: Map
    },
    pos: TLatLng
}) => {
    source.map.setMaxBounds([[-90, -180], [90, 180]])
    // source.map.flyTo(pos, 16, {
    //     animate: true,
    //     duration: 2
    // })

    source.map.setView(pos, 16)

    // source.map.setZoom(16)

    
    console.log('flyTo 2222')
    setTimeout(() => {
        console.log('ВЫЫЫЫЫЫЫЫЫЫЫЫЫЫЗЗЗЗЗЗЗОООООООООВ')
        const areal = Areal.getBounds(pos)
        shipModel.events.setAreal(areal)
        source.map?.setMinZoom(15)
    }, 2000)
})

export const setMapPosListener = () => {
    sample({
        clock: shipAPI.events.setPos,
        source: {
            map: mapModel.$mapStore,
        },
        filter: (source: {
            map: Map | null
        }): source is TMap => source.map !== null,
        fn: (source, clock) => ({
            source,
            pos: clock
        }),
        target: setPosFx
    })
}