import { createEvent, createStore } from "effector"
import { useStore } from "effector-react"
import { zoneAPI } from "shared/api/events"

const {
    setZoneLevel,
    setZoneSectors,
    setZoneTrophies,
    setZoneCoins,
    setZoneRubies,
    spendСoins,
    spendRubies,
    addCoins,
    addRubies,
    addZoneTrophies
} = zoneAPI.events

const addSector = createEvent()
const delSector = createEvent()

export const $zoneSectorsStore = createStore<number>(0)
    .on(setZoneSectors, (_, sectors) => sectors)
    .on(addSector, (sectors) => sectors + 1)
    .on(delSector, (sectors) => sectors - 1)

export const $zoneLevelStore = createStore<number>(0)
    .on(setZoneLevel, (_, level) => level)

export const $zoneTrophiesStore = createStore<number>(0)
    .on(setZoneTrophies, (_, trophies) => trophies)
    .on(addZoneTrophies, (trophies, t) => trophies + t)

export const $zoneCoinsStore = createStore<number>(0)
    .on(setZoneCoins, (_, coins) => coins)
    .on(spendСoins, (coins, spend) => coins - spend)
    .on(addCoins, (coins, c) => coins + c)

export const $zoneRubiesStore = createStore<number>(0)
    .on(setZoneRubies, (_, rubies) => rubies)
    .on(spendRubies, (rubies, spend) => rubies - spend)
    .on(addRubies, (rubies, r) => rubies + r)

const useZoneLevel = () => useStore($zoneLevelStore)
const useZoneSectors = () => useStore($zoneSectorsStore)
const useZoneTrophies = () => useStore($zoneTrophiesStore)
const useZoneCoins = () => useStore($zoneCoinsStore)
const useZoneRubies = () => useStore($zoneRubiesStore)

export const selectors = {
    useZoneLevel,
    useZoneSectors,
    useZoneTrophies,
    useZoneCoins,
    useZoneRubies,
}

export const events = {
    addSector,
    delSector,
}
