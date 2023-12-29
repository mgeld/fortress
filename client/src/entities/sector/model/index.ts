import { TZoneItem } from "@ctypes/model"
import { TSectorPayload } from "@ctypes/socket/server-to-client"
import { createEffect, createStore, sample } from "effector"
import { useStore } from "effector-react"
import { Areal } from "entities/areal/model"
import { shipModel } from "entities/ship"
import { sectorsAPI } from "shared/api/events"
import { TSetSectorById, TSetSectorZone } from "shared/api/events/sectors"
import { TLatLng } from "shared/types"

const {
    addSector,
    delSectorById,
    setSectors,
    setSectorById,
    setAboutSector,
    setZoneColor,
    addZoneAreal,
    addSectors
} = sectorsAPI.events

const DEFAULT_STORE: TZoneItem[] = []

const $sectorsStore = createStore<TZoneItem[]>(DEFAULT_STORE)
    .on(setSectors, (_, sectors: TZoneItem[]) => sectors)

    .on(addSector, (sectors, sector: TSetSectorZone) => {
        if (sectors.findIndex(zone => zone.zone.zone_id === sector.zone_id) === -1) {
            sectors.push({
                zone: {
                    zone_id: sector.zone_id,
                    color: 1
                },
                sectors: {}
            })
        }
        return sectors.map(zoneItem => zoneItem.zone.zone_id === sector.zone_id ? {
            ...zoneItem,
            sectors: {
                ...zoneItem.sectors,
                [sector.area]: zoneItem.sectors[sector.area] ? [...zoneItem.sectors[sector.area], sector.sector] : [sector.sector]
            }
        } : zoneItem)
    })

    // .on(addSectors, (sectors, nSectors) => {
    //     const diff = nSectors

    //     const __sects = sectors.map(item => {
    //         const findItem = diff.find(zone => zone.zone.zone_id === item.zone.zone_id)

    //         if (!findItem) {
    //             return item
    //         } else {
    //             diff.splice(diff.findIndex(zone => zone.zone.zone_id === item.zone.zone_id), 1)
    //             return {
    //                 ...item,
    //                 sectors: {
    //                     ...item.sectors,
    //                     ...findItem.sectors
    //                 }
    //             }
    //         }
    //     })

    //     const _return = [...__sects, ...diff]

    //     return _return

    // })

    .on(delSectorById, (sectors: TZoneItem[], sector: TSetSectorZone) => sectors.map(zoneItem => {
        return zoneItem.zone.zone_id === sector.zone_id ? {
            ...zoneItem,
            sectors: {
                ...zoneItem.sectors,
                [sector.area]: zoneItem.sectors[sector.area].filter(sector_index => {
                    if (sector_index === sector.sector) {
                        return false
                    }
                    return true
                })
            }
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
                sectors: {}
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
                sectors: {}
            })
        }

        return sectors.map(zoneItem => {
            if (zoneItem.zone.zone_id === setter.prev_zone_id)
                return {
                    ...zoneItem,
                    sectors: {
                        ...zoneItem.sectors,
                        [setter.area]: zoneItem.sectors[setter.area].filter(sect_id => {
                            if (sect_id === setter.sector) {
                                return false
                            }
                            return true
                        })
                    }
                }
            if (zoneItem.zone.zone_id === setter.new_zone_id)
                return {
                    ...zoneItem,
                    sectors: {
                        ...zoneItem.sectors,
                        [setter.area]: zoneItem.sectors[setter.area] ? [...zoneItem.sectors[setter.area], setter.sector] : [setter.sector]
                    }
                }
            return zoneItem
        })

    })


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

type TSource = {
    sectors: TZoneItem[]
    areal: [TLatLng, TLatLng] | null
    prevAreal: [TLatLng, TLatLng] | null
}

type TProps = {
    source: TSource
    nSectors: TZoneItem[]
}
const addSectorsFx = createEffect(({ source, nSectors }: TProps): TZoneItem[] => {

    const { areal, prevAreal, sectors } = source

    if (!areal) return []

    let areals: number[] = []

    if (prevAreal) {

        areals = Areal.getAreals([prevAreal[0][0] + 0.01, prevAreal[0][1] + 0.01])

        if (areal[0][0] > prevAreal[0][0]) {
            areals = areals.slice(6)
            console.log('TOP')
        }
        if (areal[0][0] < prevAreal[0][0]) {
            areals = areals.slice(0, 3)
            console.log('BOTTOM')
        }
        if (areal[0][1] > prevAreal[0][1]) {
            areals = [areals[0], areals[3], areals[6]]
            console.log('RIGHT')
        }
        if (areal[0][1] < prevAreal[0][1]) {
            areals = [areals[2], areals[5], areals[8]]
            console.log('LEFT')
        }

    }

    const diff = nSectors.slice()

    const __sects = sectors.map(item => {

        if (areals.length > 0)
            areals.forEach(function (k) {
                delete item.sectors[k];
            });

        const findItem = diff.find(zone => zone.zone.zone_id === item.zone.zone_id)

        if (!findItem) {
            return item
        } else {
            diff.splice(diff.findIndex(zone => zone.zone.zone_id === item.zone.zone_id), 1)
            return {
                ...item,
                sectors: {
                    ...item.sectors,
                    ...findItem.sectors
                }
            }
        }

    })

    return [...__sects, ...diff]

})

sample({
    clock: addSectors,
    source: {
        sectors: $sectorsStore,
        areal: shipModel.$arealStore,
        prevAreal: shipModel.$prevArealStore,
    },
    fn: (source, nSectors) => ({ source, nSectors }),
    target: addSectorsFx
})

sample({
    clock: addSectorsFx.doneData,
    target: $sectorsStore
})




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