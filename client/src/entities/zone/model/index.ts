import { TZoneColor } from "@ctypes/model"
import { createEvent, createStore } from "effector"
import { useStore } from "effector-react"
import { zoneAPI } from "shared/api/events"

const {
    setZoneLevel,
    setZoneColor,
    setZoneDescription,
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

export const $zoneDescriptionStore = createStore<string>('')
    .on(setZoneDescription, (_, descr) => descr)

export const $zoneLevelStore = createStore<number>(0)
    .on(setZoneLevel, (_, level) => level)

export const $zoneColorStore = createStore<TZoneColor>(1)
    .on(setZoneColor, (_, color) => color)

export const $zoneTrophiesStore = createStore<number>(0)
    .on(setZoneTrophies, (_, trophies) => trophies)
    .on(addZoneTrophies, (trophies, t) => trophies + t < 0 ? 0 : trophies + t)

export const $zoneCoinsStore = createStore<number>(0)
    .on(setZoneCoins, (_, coins) => coins)
    .on(spendСoins, (coins, spend) => coins - spend)
    .on(addCoins, (coins, c) => coins + c)

export const $zoneRubiesStore = createStore<number>(0)
    .on(setZoneRubies, (_, rubies) => rubies)
    .on(spendRubies, (rubies, spend) => rubies - spend)
    .on(addRubies, (rubies, r) => rubies + r)

const useZoneLevel = () => useStore($zoneLevelStore)
const useZoneColor = () => useStore($zoneColorStore)
const useZoneDescription = () => useStore($zoneDescriptionStore)

const useZoneSectors = () => useStore($zoneSectorsStore)
const useZoneTrophies = () => useStore($zoneTrophiesStore)
const useZoneCoins = () => useStore($zoneCoinsStore)
const useZoneRubies = () => useStore($zoneRubiesStore)

export const selectors = {
    useZoneLevel,
    useZoneColor,
    useZoneDescription,
    useZoneSectors,
    useZoneTrophies,
    useZoneCoins,
    useZoneRubies,
}

export const events = {
    addSector,
    delSector,
}
