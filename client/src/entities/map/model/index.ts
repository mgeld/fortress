import { Map } from "leaflet"
import { TLatLng } from "shared/types"
import { useStore } from "effector-react"
import { mapAPI } from "shared/api/events"
import { TMapModes } from "shared/api/events/map"
import { createEvent, createStore } from "effector"

const setMap = createEvent<Map>()
const setLatLngMap = createEvent<TLatLng>()
const setMapCenter = createEvent<TLatLng>()
const setMapGrid = createEvent()

export const $mapStore = createStore<null | Map>(null)
    .on(setMap, (_, map) => map)

export const $mapGrid = createStore<boolean>(false)
    .on(setMapGrid, (grid) => !grid)

export const $mapCenterDefaultStore = createStore<TLatLng>([55.74953, 37.61581])
    .on(setMapCenter, (_, latlng) => latlng)

const $mapClickLatLng = createStore<TLatLng | null>(null)
    .on(setLatLngMap, (_, latlng) => latlng)

export const $mapMode = createStore<TMapModes | null>(null)
    .on(mapAPI.events.setMapMode, (_, mode) => mode)

export const events = {
    setMap,
    setMapGrid,
    setLatLngMap,
    setMapCenter,
}

// const getUsersFx = createEffect(): Promise<TPointer[]> => {

// sample({
//     clock: setLatLngMap,
//     source: $mapStore,
//     fn: (source, clock) => ({source, clock}),
//     target: 
// })

const useMapClickLatLng = () => {
    return {
        latlng: useStore($mapClickLatLng)
    }
}
const useMapMode = () => {
    return {
        mode: useStore($mapMode)
    }
}
const useMapGrid = () => useStore($mapGrid)

const useMapLayout = () => useStore($mapStore)
const useMapCenter = () => useStore($mapCenterDefaultStore)

export const selectors = {
    useMapMode,
    useMapGrid,
    useMapCenter,
    useMapLayout,
    useMapClickLatLng,
}