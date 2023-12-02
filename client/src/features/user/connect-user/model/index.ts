import { TLatLng } from "@ctypes/model"
import { createEffect, sample } from "effector"
import { shipModel } from "entities/ship"
import { userModel } from "entities/user"
import { connectAPI } from "shared/api/connect"
import { userAPI } from "shared/api/events"

type TUser = {
  userName: string
  userIcon: string
  pos: TLatLng
  url: string
}

export const startConnectUser = () => {}

sample({
  clock: userAPI.events.connectUser,
  source: {
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

// export const events = {
//   connectUser
// }