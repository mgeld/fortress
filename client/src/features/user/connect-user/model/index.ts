import { attach, createEvent, sample } from "effector"
import { userModel } from "entities/user"
import { connectAPI } from "shared/api/connect"

const connectUser = createEvent()

sample({
  clock: connectUser,
  target: attach({
    source: {
      userId: userModel.$userIdStore,
      pos: userModel.$userPositionStore,
    },
    effect: (user) => {
      connectAPI(user.userId, user.pos)
    }
  })
})

export const events = {
    connectUser
}