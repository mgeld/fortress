import { createEffect, sample } from "effector"
import { mapModel } from "entities/map"
import { userModel } from "entities/user"
import { Map } from "leaflet"
import { TLatLng } from "shared/types"

// Прокручиваем карту, если метка вышла за пределы видимой части карты

const scrollMapPointer = createEffect(({
    map, userPos
}: {
    map: Map | null
    userPos: TLatLng
}) => {

    if (userPos[0] > 0 && userPos[1] > 0 && map) {

        let bounds = map.getBounds()

        const northEast = bounds.getNorthEast()
        const southWest = bounds.getSouthWest()

        let n_lat = northEast.lat - 0.0010;
        let n_lng = northEast.lng - 0.0010;

        let s_lat = southWest.lat + 0.0010;
        let s_lng = southWest.lng + 0.0010;

        let isSect = (
            userPos[0] < n_lat && userPos[1] < n_lng &&
            userPos[0] > s_lat && userPos[1] > s_lng
        );

        if (!isSect) {
            console.log('----------------------------------------SETVIEW')
            map.setView({
                lat: userPos[0],
                lng: userPos[1],
            });
        }

    }
})


export const scrollMapPointerListener = () => {
    sample({
        clock: userModel.events.movePoint,
        source: {
            map: mapModel.$mapStore,
            userPos: userModel.$userPositionStore,
        },
        fn: (source) => source,
        target: scrollMapPointer
    })
}