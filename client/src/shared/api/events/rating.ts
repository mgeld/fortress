import { IRatingZone } from "@ctypes/model"
import { createEvent } from "effector"

const setZones = createEvent<IRatingZone[]>()
const selectRatingZone = createEvent<IRatingZone | null>()

export const events = {
    setZones,
    selectRatingZone
}