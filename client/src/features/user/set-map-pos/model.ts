import { createEffect, sample } from "effector"
import { Areal } from "entities/areal/model"
import { mapModel } from "entities/map"
import { userModel } from "entities/user"
import { Map } from "leaflet"
import { userAPI } from "shared/api/events"
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
    source.map.flyTo(pos, 15, {
        animate: true,
        duration: 2
    })
    
    console.log('flyTo 2222')
    setTimeout(() => {
        console.log('ВЫЫЫЫЫЫЫЫЫЫЫЫЫЫЗЗЗЗЗЗЗОООООООООВ')
        const areal = Areal.getBounds(pos)
        userModel.events.setAreal(areal)
        source.map?.setMinZoom(15)
    }, 2000)
})

export const setMapPosListener = () => {
    sample({
        clock: userAPI.events.setPos,
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