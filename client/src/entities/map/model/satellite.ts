import { createEvent, createStore } from "effector"
import { useStore } from "effector-react"
import { TLatLng } from "shared/types"

export type TSatellite = {
    type: 'sector' | 'zone'
    latlng: TLatLng
    name: string
}

const useMapSatellite = () => useStore($satelliteStore)

const setMapSatellite = createEvent<TSatellite>()

export const $satelliteStore = createStore<TSatellite | null>(null)
    .on(setMapSatellite, (_, satellite) => satellite)


export const selectors = {
    useMapSatellite
}

export const events = {
    setMapSatellite
}