import { TExtrTypes } from "@ctypes/model"
import { createEffect, createEvent, sample } from "effector"
import { unitModel } from "entities/unit"
import { buyUnitAPI } from "shared/api/buy-unit"

export const onBuyUnit = createEvent()

sample({
    clock: onBuyUnit,
    source: unitModel.$unitSelect,
    filter: (unit): unit is TExtrTypes => unit !== null,
    target: createEffect((unit: TExtrTypes) => {
        buyUnitAPI(unit)
    })
})
