import { createEffect, sample } from "effector"
import { connectAPI } from "shared/api/connect"
import { userAPI } from "shared/api/events"
import { getHashToAbductionId } from "shared/lib/get-hash-to-abduction-id"

export const startConnectUser = () => { }

const connectAPIFx = createEffect(() => {
  const url = window.location.search;
  const abduction = getHashToAbductionId()
  connectAPI(
    url,
    Number(abduction)
  )
})

sample({
  clock: userAPI.events.connectUser,
  target: connectAPIFx
})