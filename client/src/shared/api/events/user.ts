import { createEvent } from "effector"
import { TLatLng } from "shared/types"

const setHealth = createEvent<number>()
const changeHealth = createEvent<number>()
const setPos = createEvent<TLatLng>()

export const events = {
    setPos,
    setHealth,
    changeHealth
}