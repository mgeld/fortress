import { createEvent } from "effector"

export type TMapModes =
    | 'invade'
    | 'select-place'
    | 'battle'

const setMapMode = createEvent<TMapModes>()

export const events = {
    setMapMode
}