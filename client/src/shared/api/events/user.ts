import { createEvent } from "effector"

const setUser = createEvent<number>()
const setRankLevel = createEvent<number>()
const setRankExp = createEvent<number>()
const addRankExp = createEvent<number>()
// const rankUpLevel = createEvent()

const connectUser = createEvent<string>()

export const events = {
    connectUser,
    setUser,
    setRankLevel,
    setRankExp,
    addRankExp,
    // rankUpLevel
}