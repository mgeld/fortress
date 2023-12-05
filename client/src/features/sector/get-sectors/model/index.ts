import { attach, createEvent, sample } from "effector"
import { shipModel } from "entities/ship"
import { getSectorsAPI } from "shared/api/get-sectors"

const getSectorsStart = createEvent()

sample({
  clock: getSectorsStart,
  target: attach({
    source: {
      pos: shipModel.$userPositionStore,
    },
    effect: (user) => {
      getSectorsAPI(user.pos)
    }
  })
})

export const events = {
    getSectorsStart
}