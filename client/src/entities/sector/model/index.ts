import { TSectorPayload } from "@ctypes/socket/server-to-client"
import { createStore } from "effector"
import { useStore } from "effector-react"
import { sectorsAPI } from "shared/api/events"
import { TSetSectorById, TSetSectorZone, TZoneItem } from "shared/api/events/sectors"

const {
    addSector,
    delSectorById,
    setSectors,
    setSectorById,
    setAboutSector,
    setZoneColor,
    addZoneAreal
} = sectorsAPI.events

const DEFAULT_STORE: TZoneItem[] = []

const $sectorsStore = createStore<TZoneItem[]>(DEFAULT_STORE)
    .on(setSectors, (_, sectors: TZoneItem[]) => sectors)
    .on(addSector, (sectors, sector: TSetSectorZone) => {
        if (sectors.findIndex(zone => zone.zone.zone_id === sector.zone_id) === -1) {
            sectors.push({
                zone: {
                    zone_id: sector.zone_id,
                    // name: '',
                    color: 1
                },
                sectors: []
            })
        }
        return sectors.map(zoneItem => zoneItem.zone.zone_id === sector.zone_id ? {
            ...zoneItem,
            sectors: [...zoneItem.sectors, sector.sector]
        } : zoneItem)
    })
    .on(delSectorById, (sectors: TZoneItem[], sector: TSetSectorZone) => sectors.map(zoneItem => {
        return zoneItem.zone.zone_id === sector.zone_id ? {
            ...zoneItem,
            sectors: zoneItem.sectors.filter(sector_index => {
                if (sector_index === sector.sector) {
                    return false
                }
                return true
            })
        } : zoneItem

    }))
    .on(setZoneColor, (sectors, setter) => {
        if (sectors.findIndex(zone => zone.zone.zone_id === setter.zone_id) === -1) {
            sectors.push({
                zone: {
                    zone_id: setter.zone_id,
                    // name: '',
                    color: setter.color
                },
                sectors: []
            })
        }
        return sectors.map(zoneItem => {
            return zoneItem.zone.zone_id === setter.zone_id ? {
                ...zoneItem,
                zone: {
                    ...zoneItem.zone,
                    color: setter.color
                }
            } : zoneItem
        })
    })
    .on(addZoneAreal, (sectors, new_zone) => {
        if (sectors.findIndex(zone => zone.zone.zone_id === new_zone.zone_id) === -1) {
            sectors.push({
                zone: {
                    zone_id: new_zone.zone_id,
                    color: new_zone.color
                },
                sectors: []
            })
        }
        return sectors
    })
    .on(setSectorById, (sectors, setter: TSetSectorById) => {

        if (sectors.findIndex(zone => zone.zone.zone_id === setter.new_zone_id) === -1) {
            sectors.push({
                zone: {
                    zone_id: setter.new_zone_id,
                    color: 1
                },
                sectors: []
            })
        }

        return sectors.map(zoneItem => {
            if (zoneItem.zone.zone_id === setter.prev_zone_id)
                return {
                    ...zoneItem,
                    sectors: zoneItem.sectors.filter(sect_id => {
                        if (sect_id === setter.sector) {
                            return false
                        }
                        return true
                    })
                }
            if (zoneItem.zone.zone_id === setter.new_zone_id)
                return {
                    ...zoneItem,
                    sectors: [...zoneItem.sectors, setter.sector]
                }
            return zoneItem
        })

    })

// type TSetSector = {
//     userId: number
//     clock: TSetSectorById
// }

// sample({
//     clock: setSectorById,
//     source: userModel.$userIdStore,
//     filter: (userId, clock) => userId !== clock.new_zone_id && userId === clock.prev_zone_id,
//     fn: (userId, clock) => ({ userId, clock }),
//     target: createEffect(({ userId, clock }: TSetSector) => {
//         zoneModel.events.delSector()
//         snackbarModel.events.newToast({
//             text: 'Ваш сектор захвачен!',
//             t: 10
//         })
//     })
// })


const $sectorAboutStore = createStore<TSectorPayload | null>(null)
    .on(setAboutSector, (_, sector) => sector)

const useSector = () => {
    return {
        zones: useStore($sectorsStore)
    }
}

const useAboutSector = () => {
    return {
        sector: useStore($sectorAboutStore)
    }
}

export const selectors = {
    useSector,
    useAboutSector
}




// export class Sector {

//     public static getSectorId(_pos: TLatLng) {
//         const lat = Math.floor(_pos[0] / 1000) * 1000
//         const long = Math.floor(_pos[1] / 1000) * 1000
//         const sector = String(lat) + String(long)
//         return sector
//     }

//     private static getArealPlace(pos: TLatLng): TLatLng {
//         return [
//             Math.floor(pos[0] * 100) / 100,
//             Math.floor(pos[1] * 100) / 100,
//         ]
//     }

//     public static getBounds(sector: TLatLng): [TLatLng, TLatLng] {
//         const latlng = Sector.getArealPlace(sector)
//         return [
//             latlng,
//             [latlng[0] + 0.01, latlng[1] + 0.01]
//         ]
//     }

// }