import { IRatingZone } from "@ctypes/model"
import { createStore } from "effector"
import { useStore } from "effector-react"
import { ratingAPI } from "shared/api/events"

const {
    setZones,
    selectRatingZone
} = ratingAPI.events

const $selectRatingZoneStore = createStore<IRatingZone | null>(null)
    .on(selectRatingZone, (_, zone) => zone)

const $ratingZonesStore = createStore<IRatingZone[] | null>(null)
    .on(setZones, (_, zones) => zones)

const useRatingZones = () => useStore($ratingZonesStore)
const useSelectZone = () => useStore($selectRatingZoneStore)

export const selectors = {
    useRatingZones,
    useSelectZone
}