import { TExtrTypes } from "@ctypes/model"
import { createEvent, createStore } from "effector"
import { useStore } from "effector-react"

const selectUnit = createEvent<TExtrTypes>()

export const $unitSelect = createStore<TExtrTypes | null>(null)
    .on(selectUnit, (_, extraction) => extraction)

$unitSelect.watch(val => console.log('unitSelect watch', val))

const useUnit = () => useStore($unitSelect)

export const selectors = {
    useUnit,
}

export const events = {
    selectUnit,
}

