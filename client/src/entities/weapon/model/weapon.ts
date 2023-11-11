import { TWeaponSymbol } from "@ctypes/model"
import { createStore } from "effector"
import { useStore } from "effector-react"
import { weaponsAPI } from "shared/api/events"
// import { TDist, TPower } from "shared/api/events/weapons"

// import { numberToSymbol } from "../lib/weapon-symbols"

// const useWeaponEvent = createEvent<string>()

// const updateWeapon = createEvent<TWeapon>()

const {
    // setWeapons,
    setDistance,
    increaseDistance,
    setPower,
    increasePower,
    setBullets,
    increaseBullets,
    setId,
    setLevel,
} = weaponsAPI.events

export type TWeaponStore = {
    id: string
    weapon: TWeaponSymbol
    level: number
    power: number
    distance: number
    bullets: number
    status: 1 | 0
}

// const DEFAULT_STORE_WEAPON: TWeaponStore[] = []

export const $gunIdStore = createStore<string>('')
    .on(setId, (_, id) => id)

export const $gunLevelStore = createStore<number>(0)
    .on(setLevel, (_, level) => level)

export const $gunPowerStore = createStore<number>(0)
    .on(setPower, (_, power) => power)
    .on(increasePower, (power, p) => power + p)

export const $gunDistanceStore = createStore<number>(0)
    .on(setDistance, (_, dist) => dist)
    .on(increaseDistance, (dist, d) => dist + d)

export const $gunBulletsStore = createStore<number>(0)
    .on(setBullets, (_, bullets) => bullets)
    .on(increaseBullets, (bullets, b) => bullets + b)

// export const $weaponStore = createStore<TWeaponStore[]>(DEFAULT_STORE_WEAPON)
//     .on(setWeapons, (_, weapons) => weapons.map(weapon => ({
//         ...weapon,
//         weapon: weapon.weapon
//     })))
//     .on(setDistance, (weapons, weapon: TDist) => weapons.map(w => w.weapon === weapon.symbol ? {
//         ...w,
//         distance: w.distance + weapon.dist
//     } : w))
//     .on(setPower, (weapons, weapon: TPower) => weapons.map(w => w.weapon === weapon.symbol ? {
//         ...w,
//         power: w.power + weapon.power
//     } : w))
//     // .on(updateWeapon, (weapons, weapon: TWeapon) => weapons.map(w => w.id === weapon.id ? weapon : w))
//     .on(useWeaponEvent, (weapons, weaponId: string) => {
//         weapons.map(weapon => ({
//             ...weapon,
//             status: weapon.id === weaponId ? 1 : 0
//         }))
//     })

// export const $usedWeaponStore = $weaponStore.map(weapons => weapons.length > 0 ? weapons.filter(weapon => weapon.status === 1)[0] : null)

// export const $featureWeaponStore = createStore<WeaponType | null>(null)

// sample({
//     clock: $usedWeaponStore,
//     filter: (weapon): weapon is TWeaponStore => weapon !== null,
//     fn: (weapon: TWeaponStore) => determinantWeapon(weapon.weapon, weapon.level),
//     target: $featureWeaponStore
// })

// const useWeapon = () => {
//     return {
//         weapons: useStore($weaponStore),
//         usedWeapon: useStore($usedWeaponStore),
//     }
// }

const useLevel = () => useStore($gunLevelStore)
const usePower = () => useStore($gunPowerStore)
const useDistance = () => useStore($gunDistanceStore)
const useBullets = () => useStore($gunBulletsStore)

export const selectors = {
    // useWeapon,
    useLevel,
    usePower,
    useDistance,
    useBullets,
}