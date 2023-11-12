import { createEvent } from "effector"
import { TBomb } from "entities/bomb/model/bomb"

const setBombs = createEvent<TBomb[]>()
const addBomb = createEvent<TBomb>()

export type TBombId = { bomb_id: number }
const delBombById = createEvent<TBombId>()

export type THealthChange = {
    hitUserId: number,
    damage: number
}
const hitBombInTarget = createEvent<THealthChange>()

export const events = {
    addBomb,
    setBombs,
    delBombById,
    hitBombInTarget,
}