import { shipModel } from "entities/ship"
import { alertModel } from "shared/ui/alert"
import { popoutModel } from "shared/ui/popout-root"
import { battleJoinAPI } from "shared/api/battle-join"
import { createEffect, createEvent, sample } from "effector"

const battleConnect = createEvent<string | null>()

type T = {
  source: { health: number },
  battleId: string | null
}

const isHealthFx = createEffect((props: T) => {

  if (props.source.health < 1) {
    popoutModel.events.setPopout('alert')
    alertModel.events.setAlert({
      alert: 'Корабль сломан',
      message: 'Ваш корабль сломан. Чтобы участвовать в битвах, необходимо улучшить состояние корабля.',
      action: {
        close: false,
        text: 'Улучшить',
        _click: () => popoutModel.events.setPopout('ship-improve-health')
      }
    })
    return 0
  }

  if (props?.battleId) battleJoinAPI(props.battleId)
  else battleJoinAPI()

})

sample({
  clock: battleConnect,
  source: {
    health: shipModel.$userHealthStore
  },
  fn: (source, battleId) => ({ source, battleId }),
  target: isHealthFx
})

export const events = {
  battleConnect
}