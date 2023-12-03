import { IRatingZones } from "@ctypes/model"
import { createStore } from "effector"
import { useStore } from "effector-react"
import { ratingAPI } from "shared/api/events"

const {
    setZones
} = ratingAPI.events

const $ratingZonesStore = createStore<IRatingZones[] | null>(null)
    .on(setZones, (_, zones) => zones)

const useRating = () => {
    return {
        zones: useStore($ratingZonesStore)
    }
}

export const selectors = {
    useRating
}