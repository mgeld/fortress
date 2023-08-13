import { createEvent } from "effector"
import { TTake } from "entities/invader/model/invader"

const setTakes = createEvent<TTake[]>()
const addTake = createEvent<TTake>()

export type TTakeId = { take_id: number }
const delTakeById = createEvent<TTakeId>()

export const events = {
    addTake,
    setTakes,
    delTakeById,
}