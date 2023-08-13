import { attach, createEvent, sample } from "effector"
import { userModel } from "entities/user"
import { connectAPI } from "shared/api/connect"

const connectUser = createEvent()

connectUser.watch(() => console.log('Event connectUser'))

sample({
  clock: connectUser,
  target: attach({
    source: {
      userId: userModel.$userIdStore,
      userName: userModel.$userNameStore,
      pos: userModel.$userPositionStore,
    },
    effect: (user) => {
      connectAPI(user.userId, user.userName, user.pos)
    }
  })
})

export const events = {
    connectUser
}