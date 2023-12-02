import { createEffect, createEvent, sample } from "effector"
import { shipModel } from "entities/ship"
import { battleJoinAPI } from "shared/api/battle-join"
import { alertModel } from "shared/ui/alert"
import { popoutModel } from "shared/ui/popout-root"

const battleConnect = createEvent()

const isHealthFx = createEffect(({ health }: { health: number }) => {
  if (health < 1) {
    popoutModel.events.setPopout('alert')
    alertModel.events.setAlert({
      alert: 'Корабль сломан',
      message: 'Ваш корабль сломан. Чтобы участвовать в битвах, необходимо улучшить состояние корабля.',
      action: {
        close: false,
        text: 'Повысить',
        _click: () => popoutModel.events.setPopout('ship-improve-health')
      }
    })
    return 0
  }
  battleJoinAPI()
})

sample({
  clock: battleConnect,
  source: {
    health: shipModel.$userHealthStore
  },
  target: isHealthFx
})

export const events = {
  battleConnect
}