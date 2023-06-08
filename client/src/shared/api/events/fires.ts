import { createEvent } from "effector"
import { TFire } from "entities/fire/model/fire"

const setFires = createEvent<TFire[]>()
const addFire = createEvent<TFire>()
const addFireHitMarket = createEvent<TFire>()

export type TFireId = { fire_id: number }
const delFireById = createEvent<TFireId>()

export type THealthChange = {
    hitUserId: number,
    damage: number
}
const hitFireInTarget = createEvent<THealthChange>()

export const events = {
    addFire,
    setFires,
    delFireById,
    hitFireInTarget,
    addFireHitMarket,
}