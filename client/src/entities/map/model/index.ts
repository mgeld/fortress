import { createEvent, createStore } from "effector";
import { useStore } from "effector-react";
import { Map } from "leaflet";
import { mapAPI } from "shared/api/events";
import { TMapModes } from "shared/api/events/map";
import { TLatLng } from "shared/types";

const setMap = createEvent<Map>()
const setLatLngMap = createEvent<TLatLng>()

export const $mapStore = createStore<null | Map>(null)
    .on(setMap, (_, map) => map)

const $mapClickLatLng = createStore<TLatLng | null>(null)
    .on(setLatLngMap, (_, latlng) => latlng)

const $mapMode = createStore<TMapModes | null>(null)
    .on(mapAPI.events.setMapMode, (_, mode) => mode)

$mapClickLatLng.watch(value => console.log('mapClickLatLng value', value))

export const events = {
    setMap,
    setLatLngMap
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
const useMapLayout = () => useStore($mapStore)

export const selectors = {
    useMapMode,
    useMapClickLatLng,
    useMapLayout
}