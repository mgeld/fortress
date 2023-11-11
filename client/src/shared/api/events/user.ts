import { createEvent } from "effector"

const setUser = createEvent<number>()
const setRankLevel = createEvent<number>()
const setRankExp = createEvent<number>()
const addRankExp = createEvent<number>()
// const rankUpLevel = createEvent()

export const events = {
    setUser,
    setRankLevel,
    setRankExp,
    addRankExp,
    // rankUpLevel
}