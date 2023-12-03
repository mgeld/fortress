import { IRatingZones } from "@ctypes/model"
import { createEvent } from "effector"

const setZones = createEvent<IRatingZones[]>()

export const events = {
    setZones
}