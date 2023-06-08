import { createEvent, createStore } from "effector";
import { Map } from "leaflet";

const setMap = createEvent<Map>()

export const $mapStore = createStore<null | Map>(null)
    .on(setMap, (_, map) => map)

export const events = {
    setMap
}