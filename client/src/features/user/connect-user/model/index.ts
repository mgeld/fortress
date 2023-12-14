import { TLatLng } from "@ctypes/model"
import { createEffect, sample } from "effector"
import { shipModel } from "entities/ship"
import { connectAPI } from "shared/api/connect"
import { userAPI } from "shared/api/events"

type TUser = {
  pos: TLatLng
  // url: string
}

export const startConnectUser = () => { }

const connectAPIFx = createEffect((params: TUser) => {
  const url = window.location.search;
  connectAPI(
    url,
    params.pos
  )
})

sample({
  clock: userAPI.events.connectUser,
  source: {
    pos: shipModel.$userPositionStore,
  },
  fn: (source, clock) => ({
    pos: source.pos,
    // url: clock
  }),
  target: connectAPIFx
})

// export const events = {
//   connectUser
// }