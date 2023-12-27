import { IRatingZone, TZoneAbduction } from "@ctypes/model"
import { createEvent } from "effector"

const setZones = createEvent<TZoneAbduction[]>()
const selectAbductionZone = createEvent<IRatingZone | null>()

export const events = {
    setZones,
    selectAbductionZone
}