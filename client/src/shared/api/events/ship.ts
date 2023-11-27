import { createEvent } from "effector"
import { TLatLng } from "shared/types"

const setHealth = createEvent<number>()
const changeHealth = createEvent<number>()
const addHealth = createEvent<number>()

const setPos = createEvent<TLatLng>()
const setLevel = createEvent<number>()

// setPos.watch((pos) => console.log('SET_POS WATCH', pos))

export const events = {
    setPos,
    setLevel,
    setHealth,
    addHealth,
    changeHealth,
}