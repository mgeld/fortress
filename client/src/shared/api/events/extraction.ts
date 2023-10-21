import { createEvent } from "effector"

const addExtraction = createEvent<number>()
const delExtraction = createEvent<number>()

export const events = {
    addExtraction,
    delExtraction
}