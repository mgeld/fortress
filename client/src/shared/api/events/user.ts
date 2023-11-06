import { createEvent } from "effector"
import { TLatLng } from "shared/types"

const setHealth = createEvent<number>()
const changeHealth = createEvent<number>()
const setPos = createEvent<TLatLng>()

const setUser = createEvent<number>()

setPos.watch((pos) => console.log('SET_POS WATCH', pos))

export const events = {
    setPos,
    setHealth,
    changeHealth,
    setUser
}