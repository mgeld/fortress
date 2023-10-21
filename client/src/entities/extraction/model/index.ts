import { TExtrTypes } from "@ctypes/model"
import { createEvent, createStore } from "effector"
import { useStore } from "effector-react"
import { extractionAPI } from "shared/api/events"

const setExtraction = createEvent<number[]>()


// export type TExtrTypes = 1 | 2 | 3 | 4 | 5 | 6
export type TExtraction = {
    id: TExtrTypes
    index: number
}
const selectExtraction = createEvent<TExtraction>()

const {
    addExtraction,
    delExtraction
} = extractionAPI.events

export const $extractionList = createStore<number[]>([])
    .on(setExtraction, (_, extraction) => extraction)
    .on(addExtraction, (extraction, newExtr) => [...extraction, newExtr])
    .on(delExtraction, (extraction, index) => {
        extraction.splice(index, 1)
        return extraction
    })

$extractionList.watch(val => console.log('extractionList watch', val))

export const $extractionSelect = createStore<TExtraction | null>(null)
    .on(selectExtraction, (_, extraction) => extraction)

const useExtractionList = () => useStore($extractionList)
const useExtraction = () => useStore($extractionSelect)

export const selectors = {
    useExtractionList,
    useExtraction,
}

export const events = {
    selectExtraction,
}

