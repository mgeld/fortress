import { IRatingZone, TZoneAbduction } from "@ctypes/model"
import { createEffect, createEvent, createStore, sample } from "effector"
import { useStore } from "effector-react"
import { userModel } from "entities/user"
import { abductionAPI } from "shared/api/events"
import { getAbductionAPI } from "shared/api/get-abduction"

const {
    setZones,
    selectAbductionZone
} = abductionAPI.events

const $selectAbductionZoneStore = createStore<IRatingZone | null>(null)
    .on(selectAbductionZone, (_, zone) => zone)

const $abductionZonesStore = createStore<TZoneAbduction[] | null>(null)
    .on(setZones, (_, zones) => zones)

const useAbductionZones = () => useStore($abductionZonesStore)
const useSelectZone = () => useStore($selectAbductionZoneStore)

export const selectors = {
    useAbductionZones,
    useSelectZone
}

const getMyAbduction = createEvent()
sample({
    clock: getMyAbduction,
    source: userModel.$userIdStore,
    target: createEffect((zoneId: number) => {
        getAbductionAPI(zoneId, 1)
    })
})

export const events = {
    getMyAbduction,
}