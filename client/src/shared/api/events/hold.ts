import { TExtrTypes } from "@ctypes/model"
import { createEvent } from "effector"

const setItems = createEvent<TExtrTypes[]>()
const setLevel = createEvent<number>()

const addExtraction = createEvent<TExtrTypes>()
const delExtraction = createEvent<number>()

export const events = {
    setItems,
    setLevel,
    addExtraction,
    delExtraction
}