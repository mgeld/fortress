import { attach, createEvent, sample } from "effector"
// import { mapModel } from "entities/map"
// import { userModel } from "entities/user"
import { battleLeaveAPI } from "shared/api/battle-leave"

export const battleLeave = createEvent()

sample({
    clock: battleLeave,
    target: attach({
        source: {
            // map: mapModel.$mapStore
        },
        effect: (source) => {
            // source.map?.flyTo(source.userPos, 15)
            // setTimeout(() => source.map?.setMinZoom(15), 2000)
            battleLeaveAPI()
        }
    })
})