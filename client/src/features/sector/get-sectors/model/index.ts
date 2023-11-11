import { attach, createEvent, sample } from "effector"
import { shipModel } from "entities/ship"
import { userModel } from "entities/user"
import { getSectorsAPI } from "shared/api/get-sectors"

const getSectorsStart = createEvent()

sample({
  clock: getSectorsStart,
  target: attach({
    source: {
      userId: userModel.$userIdStore,
      pos: shipModel.$userPositionStore,
    },
    effect: (user) => {
      getSectorsAPI(user.pos, user.userId)
    }
  })
})

export const events = {
    getSectorsStart
}