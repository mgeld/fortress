// import { TLatLng } from "@ctypes/model"
import { createEffect, sample } from "effector"
// import { shipModel } from "entities/ship"
import { connectAPI } from "shared/api/connect"
import { userAPI } from "shared/api/events"
import { getHashToAbductionId } from "shared/lib/get-hash-to-abduction-id"

// type TUser = {
//   // pos: TLatLng
// }

export const startConnectUser = () => { }

const connectAPIFx = createEffect(() => {
  const url = window.location.search;
  const abduction = getHashToAbductionId()
  // const url = window.location.search;

  connectAPI(
    url,
    Number(abduction)
    // params.pos
  )
})

sample({
  clock: userAPI.events.connectUser,
  // source: {
  //   // pos: shipModel.$userPositionStore,
  // },
  // fn: (source, clock) => ({
  //   // pos: source.pos,
  // }),
  target: connectAPIFx
})

// export const events = {
//   connectUser
// }