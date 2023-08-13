import { TSectorPayload, TTakeHitPayload } from "@ctypes/socket/server-to-client"
import { createEvent } from "effector"

export type TSectors = string[]

type TZoneColor = 1 | 2 | 3 | 4 | 5 | 6

export type TZone = {
    zone_id: number
    color: TZoneColor
    name: string
}
export type TZoneItem = {
    zone: TZone
    sectors: TSectors
}

export type TSetSectorZone = {
    zone_id: number
    sector: string
}

export type TSetSectorById = {
    prev_zone_id: number
    new_zone_id: number
    sector: string
}

const setSectors = createEvent<TZoneItem[]>()
const addSector = createEvent<TSetSectorZone>()
const delSectorById = createEvent<TSetSectorZone>()
const setSectorById = createEvent<TSetSectorById>()

const setTakeFort = createEvent<TTakeHitPayload | null>()

const setAboutSector = createEvent<TSectorPayload | null>()

export const events = {
    setSectors,
    addSector,
    delSectorById,
    setTakeFort,
    setSectorById,
    setAboutSector
}