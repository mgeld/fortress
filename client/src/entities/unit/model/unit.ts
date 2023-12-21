import { TExtrTypes } from "@ctypes/model"
import { createEvent, createStore } from "effector"
import { useStore } from "effector-react"

// const selectUnit = createEvent<TExtrTypes>()
const selectBuyUnit = createEvent<TExtrTypes>()

// Покупка предмета
export const $unitBuySelect = createStore<TExtrTypes | null>(null)
    .on(selectBuyUnit, (_, unit) => unit)

// export const $unitSelect = createStore<TExtrTypes | null>(null)
//     .on(selectUnit, (_, unit) => unit)

// const useUnit = () => useStore($unitSelect)
const useBuyUnit = () => useStore($unitBuySelect)

export const selectors = {
    // useUnit,
    useBuyUnit
}

export const events = {
    // selectUnit,
    selectBuyUnit
}

