import { createEvent } from "effector"

const setZoneSectors = createEvent<number>()
const setZoneLevel = createEvent<number>()

const setZoneTrophies = createEvent<number>()
const addZoneTrophies = createEvent<number>()

const setZoneCoins = createEvent<number>()
const addCoins = createEvent<number>()
const spendСoins = createEvent<number>()
const setZoneRubies = createEvent<number>()
const spendRubies = createEvent<number>()
const addRubies = createEvent<number>()



export const events = {
    setZoneSectors,
    setZoneLevel,
    
    setZoneTrophies,
    addZoneTrophies,

    setZoneCoins,
    spendСoins,
    addCoins,
    spendRubies,
    setZoneRubies,
    addRubies
}