import { createEffect, createEvent, createStore, sample } from "effector"
import { useStore } from "effector-react"
import { $mapStore } from "entities/map/model"
import { getDestination } from "entities/sector/lib/getDestination"
import { $arealStore, $userPositionStore } from "entities/ship/model"
import { Map } from "leaflet"
import { TLatLng } from "shared/types"

export type TSizeDrone = {
    px: number
    degrees: number
}
export const $sizeDroneStore = createStore<TSizeDrone>({
    px: 0,
    degrees: 0
})

type TGetDroneSizefxProps = {
    // userPos: TLatLng
    map: Map
}

const getDroneSizefx = createEffect(({
    map,
    // userPos
}: TGetDroneSizefxProps,
    // eventSize: TLatLng | undefined
): TSizeDrone => {

    // const toPosLatLng = getDestination(userPos[0], userPos[1], 96, 90)
    // const toPosLatLng = getDestination(userPos[0], userPos[1], 48, 90)

    const mapCenter = map.getCenter()
    const pos: TLatLng = [mapCenter.lat, mapCenter.lng]

    const toPosLatLng = getDestination(pos[0], pos[1], 30, 90)

    const fromPoint = map.latLngToLayerPoint(pos)
    const toPoint = map.latLngToLayerPoint(toPosLatLng)

    return {
        px: toPoint.x - fromPoint.x,
        degrees: Math.abs(pos[1] - toPosLatLng[1])
    }
})

type TMap = {
    map: Map
    userPos: TLatLng
}

sample({
    clock: $arealStore,
    target: createEffect(() => setSizeDrone())
})

const setSizeDrone = createEvent()

sample({
    clock: setSizeDrone,
    source: {
        userPos: $userPositionStore,
        map: $mapStore
    },
    filter: (source: {
        map: Map | null
        // userPos: TLatLng
    }): source is TMap => source.map !== null,
    // source.userPos[0] !== 0,
    target: getDroneSizefx
})

sample({
    clock: getDroneSizefx.doneData,
    target: $sizeDroneStore
})

// $sizeDroneStore.watch(value => 'sizeDroneStore: ' + value)

const useDroneSize = () => useStore($sizeDroneStore)

export const selectors = {
    useDroneSize,
}

export const events = {
    setSizeDrone
}