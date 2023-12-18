import { createEvent } from "effector"
import { TLatLng } from "shared/types"

const setHealth = createEvent<number>()
const changeHealth = createEvent<number>()
const addHealth = createEvent<number>()

const initPos = createEvent<TLatLng>()
const setPos = createEvent<TLatLng>()
const setLevel = createEvent<number>()

export const events = {
    initPos,
    setPos,
    setLevel,
    setHealth,
    addHealth,
    changeHealth,
}