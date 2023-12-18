import { createEffect, sample } from "effector"
import { Areal } from "entities/areal/model"
import { mapModel, mapSatelliteModel } from "entities/map"
import { TSatellite } from "entities/map/model/satellite"
import { droneMapModel } from "entities/pointer"
import { shipModel } from "entities/ship"
import { Map } from "leaflet"
import { directAPI } from "shared/api/direct"
import { shipAPI } from "shared/api/events"
import { TMapModes } from "shared/api/events/map"
import { TLatLng } from "shared/types"

type TMap = {
    map: Map
    mode: TMapModes
    satellite: null
}

const setPosFx = createEffect(({
    source,
    pos
}: {
    source: TMap
    pos: TLatLng
}) => {

    const areal = Areal.getBounds(pos)
    shipModel.events.setAreal(areal)

    // Добавил в 06.12.2023 где в час ночи
    droneMapModel.events.setSizeDrone()

    source.map.setView(pos, 16)

    if (source.mode === 'invade') {
        setTimeout(() => directAPI(pos), 200)
    }

})

export const setMapPosListener = () => {
    sample({
        clock: shipAPI.events.setPos,
        source: {
            map: mapModel.$mapStore,
            mode: mapModel.$mapMode,
            satellite: mapSatelliteModel.$satelliteStore
        },
        filter: (source: {
            map: Map | null
            satellite: TSatellite | null
        }): source is TMap => source.map !== null && source.satellite === null,
        fn: (source, clock) => ({
            source,
            pos: clock
        }),
        target: setPosFx
    })
}