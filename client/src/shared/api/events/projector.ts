import { TFindContPayload } from "@ctypes/socket/server-to-client"
import { createEvent } from "effector"
import { TBeam, TBooty } from "entities/projector/model/tractor-beam"

const setBeam = createEvent<TBeam | null>()

const setContainer = createEvent<TFindContPayload | null>()

const addBooty = createEvent<TBooty>()

export type TBootyId = { booty_id: number }
const delBootyById = createEvent<TBootyId>()

export const events = {
    setBeam,
    addBooty,
    delBootyById,
    setContainer
}