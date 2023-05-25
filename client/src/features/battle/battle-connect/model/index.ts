import { attach, createEvent, sample } from "effector"
import { userModel } from "entities/user"
import { battleJoinAPI } from "shared/api/battle-join"

const battleConnect = createEvent()

sample({
  clock: battleConnect,
  target: attach({
    source: {
      userId: userModel.$userIdStore
    },
    effect: (user) => {
      battleJoinAPI(user.userId)
    }
  })
})

export const events = {
    battleConnect
}