import { createEvent } from "effector"

const setHealth = createEvent<number>()
const changeHealth = createEvent<number>()

export const events = {
    setHealth,
    changeHealth
}