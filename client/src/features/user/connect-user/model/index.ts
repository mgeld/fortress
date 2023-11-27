import { TLatLng } from "@ctypes/model"
import { createEffect, createEvent, sample } from "effector"
import { shipModel } from "entities/ship"
import { userModel } from "entities/user"
import { connectAPI } from "shared/api/connect"

const connectUser = createEvent<string>()

type TUser = {
  userName: string
  userIcon: string
  pos: TLatLng
  url: string
}
sample({
  clock: connectUser,
  source: {
    // userVkId: userModel.$userVkIdStore,
    userName: userModel.$userNameStore,
    userIcon: userModel.$userIconStore,
    pos: shipModel.$userPositionStore,
  },
  fn: (source, clock) => ({
    userName: source.userName,
    userIcon: source.userIcon,
    pos: source.pos,
    url: clock
  }),
  target: createEffect((params: TUser) => {
    connectAPI(
      params.url,
      params.userName,
      params.userIcon,
      params.pos
    )
  })
})

export const events = {
  connectUser
}