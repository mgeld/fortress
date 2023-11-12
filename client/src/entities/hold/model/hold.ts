import { TExtrTypes } from "@ctypes/model"
import { createEvent, createStore } from "effector"
import { useStore } from "effector-react"
import { holdAPI } from "shared/api/events"

// const setExtraction = createEvent<number[]>()

export type TExtraction = {
    id: TExtrTypes
    index: number
}
const selectExtraction = createEvent<TExtraction>()

const {
    addExtraction,
    delExtraction,
    setItems,
    setLevel
} = holdAPI.events

// export const $extractionList = createStore<number[]>([])
//     .on(setExtraction, (_, extraction) => extraction)
//     .on(addExtraction, (extraction, newExtr) => [...extraction, newExtr])
//     .on(delExtraction, (extraction, index) => {
//         extraction.splice(index, 1)
//         return extraction
//     })

export const $holdItemsStrore = createStore<TExtrTypes[]>([])
    .on(setItems, (_, items) => items)
    .on(addExtraction, (extraction, newExtr) => [...extraction, newExtr])
    .on(delExtraction, (extraction, index) => {
        extraction.splice(index, 1)
        return extraction
    })

export const $holdLevelStrore = createStore<number>(0)
    .on(setLevel, (_, level) => level)

$holdItemsStrore.watch(val => console.log('holdItemsStrore watch', val))

export const $extractionSelect = createStore<TExtraction | null>(null)
    .on(selectExtraction, (_, extraction) => extraction)

// const useExtractionList = () => useStore($extractionList)
const useExtraction = () => useStore($extractionSelect)
const useHoldItems = () => useStore($holdItemsStrore)
const useHoldLevel = () => useStore($holdLevelStrore)

export const selectors = {
    // useExtractionList,
    useExtraction,
    useHoldItems,
    useHoldLevel
}

export const events = {
    selectExtraction,
}

