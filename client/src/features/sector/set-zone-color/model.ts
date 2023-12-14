import { TZoneColor } from "@ctypes/model"
import { createEffect, sample } from "effector"
import { userModel } from "entities/user"
import { sectorsAPI } from "shared/api/events"

export const setMyZoneColorStartSample = () => { }

const setZoneColorFx = createEffect((zone: {
    zoneId: number,
    color: TZoneColor
}) => {
    sectorsAPI.events.setZoneColor({
        zone_id: zone.zoneId,
        color: zone.color
    })
})

sample({
    clock: sectorsAPI.events.setMyZoneColor,
    source: userModel.$userIdStore,
    fn: (zoneId, color) => {
        return {
            zoneId,
            color
        }
    },
    target: setZoneColorFx
})