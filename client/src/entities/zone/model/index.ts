import { createStore } from "effector"
import { useStore } from "effector-react"
import { zoneAPI } from "shared/api/events"

const {
    setZoneSectors,
    setZoneTrophies,
    setZoneCoins,
    setZoneRubies,
} = zoneAPI.events

export const $zoneSectorsStore = createStore<number>(0)
    .on(setZoneSectors, (_, sectors) => sectors)

export const $zoneTrophiesStore = createStore<number>(0)
    .on(setZoneTrophies, (_, trophies) => trophies)

export const $zoneCoinsStore = createStore<number>(0)
    .on(setZoneCoins, (_, coins) => coins)

export const $zoneRubiesStore = createStore<number>(0)
    .on(setZoneRubies, (_, rubies) => rubies)

const useZoneSectors = () => useStore($zoneSectorsStore)
const useZoneTrophies = () => useStore($zoneTrophiesStore)
const useZoneCoins = () => useStore($zoneCoinsStore)
const useZoneRubies= () => useStore($zoneRubiesStore)

export const selectors = {
    useZoneSectors,
    useZoneTrophies,
    useZoneCoins,
    useZoneRubies,
}