import { TWeaponSymbol } from "@ctypes/model"
import { createEvent, createStore, sample } from "effector"
import { useStore } from "effector-react"
import { weaponsAPI } from "shared/api/events"
import { determinantWeapon } from "../lib/determinant-weapon"
import { WeaponType } from "../lib/gun"
import { TDist } from "shared/api/events/weapons"
// import { numberToSymbol } from "../lib/weapon-symbols"

const useWeaponEvent = createEvent<string>()

// const updateWeapon = createEvent<TWeapon>()

const {
    setWeapons,
    setDistance
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

const DEFAULT_STORE_WEAPON: TWeaponStore[] = []

export const $weaponStore = createStore<TWeaponStore[]>(DEFAULT_STORE_WEAPON)
    .on(setWeapons, (_, weapons) => weapons.map(weapon => ({
        ...weapon,
        weapon: weapon.weapon
    })))
    .on(setDistance, (weapons, weapon: TDist) => weapons.map(w => w.weapon === weapon.symbol ? {
        ...w,
        distance: w.distance + weapon.dist
    } : w))
    // .on(updateWeapon, (weapons, weapon: TWeapon) => weapons.map(w => w.id === weapon.id ? weapon : w))
    .on(useWeaponEvent, (weapons, weaponId: string) => {
        weapons.map(weapon => ({
            ...weapon,
            status: weapon.id === weaponId ? 1 : 0
        }))
    })

export const $usedWeaponStore = $weaponStore.map(weapons => weapons.length > 0 ? weapons.filter(weapon => weapon.status === 1)[0] : null)

// export const $featureWeaponStore = createStore<WeaponType | null>(null)

// sample({
//     clock: $usedWeaponStore,
//     filter: (weapon): weapon is TWeaponStore => weapon !== null,
//     fn: (weapon: TWeaponStore) => determinantWeapon(weapon.weapon, weapon.level),
//     target: $featureWeaponStore
// })

const useWeapon = () => {
    return {
        weapons: useStore($weaponStore),
        usedWeapon: useStore($usedWeaponStore),
        // featureWeapon: useStore($featureWeaponStore)
    }
}

export const selectors = {
    useWeapon,
}