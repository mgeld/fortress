import { createEvent, createStore } from "effector"
import { useStore } from "effector-react"
import { zoneAPI } from "shared/api/events"

const {
    setZoneSectors,
    setZoneTrophies,
    setZoneCoins,
    setZoneRubies,
} = zoneAPI.events

const addSector = createEvent()
const delSector = createEvent()

export const $zoneSectorsStore = createStore<number>(0)
    .on(setZoneSectors, (_, sectors) => sectors)
    .on(addSector, (sectors) => sectors + 1)
    .on(delSector, (sectors) => sectors - 1)

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

export const events = {
    addSector,
    delSector,
}
