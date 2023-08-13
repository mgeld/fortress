import { attach, createEvent, sample } from "effector"
import { userModel } from "entities/user"
import { getSectorsAPI } from "shared/api/get-sectors"

const getSectorsStart = createEvent()

sample({
  clock: getSectorsStart,
  target: attach({
    source: {
      userId: userModel.$userIdStore,
      pos: userModel.$userPositionStore,
    },
    effect: (user) => {
      getSectorsAPI(user.pos, user.userId)
    }
  })
})

export const events = {
    getSectorsStart
}