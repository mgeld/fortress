import { attach, createEvent, sample } from "effector"
import { userModel } from "entities/user"
import { connectAPI } from "shared/api/connect"

const connectUser = createEvent()

connectUser.watch(() => console.log('Event connectUser'))

sample({
  clock: connectUser,
  target: attach({
    source: {
      userVkId: userModel.$userVkIdStore,
      userName: userModel.$userNameStore,
      userIcon: userModel.$userIconStore,
      pos: userModel.$userPositionStore,
    },
    effect: (user) => {
      connectAPI(
        user.userVkId, 
        user.userName, 
        user.userIcon,
        user.pos)
    }
  })
})

export const events = {
    connectUser
}