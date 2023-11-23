import { createEffect, createEvent, sample } from "effector"
import { battleJoinAPI } from "shared/api/battle-join"

const battleConnect = createEvent()

sample({
  clock: battleConnect,
  target: createEffect(() => {
    battleJoinAPI()
  })
})

export const events = {
  battleConnect
}