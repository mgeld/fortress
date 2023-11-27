import { createEffect, sample } from "effector"
import { Areal } from "entities/areal/model"
import { mapModel } from "entities/map"
import { shipModel } from "entities/ship"
import { Map } from "leaflet"
import { directAPI } from "shared/api/direct"
import { shipAPI } from "shared/api/events"
import { TMapModes } from "shared/api/events/map"
import { TLatLng } from "shared/types"

type TMap = {
    map: Map
    mode: TMapModes
}

const setPosFx = createEffect(({
    source,
    pos
}: {
    source: TMap
    pos: TLatLng
}) => {

    // source.map.setMaxBounds([[-90, -180], [90, 180]])
    // source.map.flyTo(pos, 16, {
    //     animate: true,
    //     duration: 2
    // })

    const areal = Areal.getBounds(pos)
    shipModel.events.setAreal(areal)

    // setTimeout(() => {
    // source.map.setZoom(16)
    source.map.setView(pos, 16)
    // setTimeout(() => , 300)
    // }, 200)
    // source.map?.setMinZoom(15)

    if (source.mode === 'invade') {
        setTimeout(() => directAPI(pos), 200)
    }

    // setTimeout(() => {
    // console.log('PPPPPPPPP setTimeout setPosFx')

    //     const areal = Areal.getBounds(pos)
    //     shipModel.events.setAreal(areal)
    //     source.map?.setMinZoom(15)
    // }, 2000)
})

export const setMapPosListener = () => {
    sample({
        clock: shipAPI.events.setPos,
        source: {
            map: mapModel.$mapStore,
            mode: mapModel.$mapMode,
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