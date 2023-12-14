import { Map } from "leaflet"
import { TLatLng } from "shared/types"
import { useStore } from "effector-react"
import { $mapStore } from "entities/map/model"
import { getDestination } from "shared/lib/getDestination"
import { createEffect, createEvent, createStore, sample } from "effector"
import { shipModel } from "entities/ship"

// import { $arealStore } from "entities/ship/model"

export type TSizeDrone = {
    px: number
    degrees: number
}

export const $sizeDroneStore = createStore<TSizeDrone>({
    px: 0,
    degrees: 0
})

type TGetDroneSizefxProps = { map: Map }

const getDroneSizefx = createEffect(({ map }: TGetDroneSizefxProps): TSizeDrone => {

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

type TMap = { map: Map }

const setSizeDrone = createEvent()

sample({
    clock: shipModel.$arealStore,
    target: setSizeDrone
})

sample({
    clock: setSizeDrone,
    source: {
        map: $mapStore
    },
    filter: (source: {
        map: Map | null
    }): source is TMap => source.map !== null,
    target: getDroneSizefx
})

sample({
    clock: getDroneSizefx.doneData,
    target: $sizeDroneStore
})

const useDroneSize = () => useStore($sizeDroneStore)

export const selectors = {
    useDroneSize
}

export const events = {
    setSizeDrone
}