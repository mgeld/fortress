import { createEvent } from "effector"
import { TSectorPayload, TTakeHitPayload } from "@ctypes/socket/server-to-client"
import { TZone } from "@ctypes/model"

export type TSectors = string[]

type TZoneColor = 1 | 2 | 3 | 4 | 5 | 6

// export type TZone = {
//     zone_id: number
//     color: TZoneColor
//     name: string
// }
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
export type TSetZoneColor = {
    zone_id: number
    color: TZoneColor
}

const setSectors = createEvent<TZoneItem[]>()
const addSector = createEvent<TSetSectorZone>()
const delSectorById = createEvent<TSetSectorZone>()
const setSectorById = createEvent<TSetSectorById>()
const setZoneColor = createEvent<TSetZoneColor>()
const setMyZoneColor = createEvent<TZoneColor>()

const setTakeFort = createEvent<TTakeHitPayload | null>()

const setAboutSector = createEvent<TSectorPayload | null>()

const addZoneAreal = createEvent<TZone>()

export const events = {
    setSectors,
    addSector,
    delSectorById,
    setTakeFort,
    setSectorById,
    setAboutSector,
    setZoneColor,
    setMyZoneColor,
    addZoneAreal
}