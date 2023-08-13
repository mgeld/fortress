import { createEvent } from "effector"

const setZoneSectors = createEvent<number>()
const setZoneTrophies = createEvent<number>()
const setZoneCoins = createEvent<number>()
const setZoneRubies = createEvent<number>()

export const events = {
    setZoneSectors,
    setZoneTrophies,
    setZoneCoins,
    setZoneRubies,
}