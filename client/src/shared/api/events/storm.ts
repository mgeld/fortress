import { createEvent } from "effector"

const setStormInvaders = createEvent<number>()
const setStormPower = createEvent<number>()
const setStormLevel = createEvent<number>()
const setStormCapacity = createEvent<number>()
const improveStormPower = createEvent<number>()

const addInvaders = createEvent<number>()

export const events = {
    setStormInvaders,
    setStormPower,
    setStormLevel,
    setStormCapacity,
    improveStormPower,
    addInvaders
}
