import { createEvent } from "effector"
import { TGunFire } from "entities/gun-fire/model/gun-fire"

const setFires = createEvent<TGunFire[]>()
const addFire = createEvent<TGunFire>()
const addFireHitMarket = createEvent<TGunFire>()

export type TFireId = { fire_id: number }
const delFireById = createEvent<TFireId>()

export const events = {
    setFires,
    addFire,
    addFireHitMarket,
    delFireById
}