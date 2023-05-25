import { TWeapon } from "@ctypes/model"
import { createEvent, createStore, sample } from "effector"
import { useStore } from "effector-react"
import { weaponsAPI } from "shared/api/events"
import { determinantWeapon } from "../lib/determinant-weapon"
import { WeaponType } from "../lib/gun"

const useWeaponEvent = createEvent<string>()

// const updateWeapon = createEvent<TWeapon>()

const {
    setWeapons
} = weaponsAPI.events

const DEFAULT_STORE_WEAPON: TWeapon[] = []

export const $weaponStore = createStore<TWeapon[]>(DEFAULT_STORE_WEAPON)
    .on(setWeapons, (_, weapons: TWeapon[]) => weapons)
    // .on(updateWeapon, (weapons, weapon: TWeapon) => weapons.map(w => w.id === weapon.id ? weapon : w))
    .on(useWeaponEvent, (weapons, weaponId: string) => {
        weapons.map(weapon => ({
            ...weapon,
            status: weapon.id === weaponId ? 'used' : 'stock'
        }))
    })

export const $usedWeaponStore = $weaponStore
    .map(weapons => weapons.length > 0 ? weapons.filter(weapon => weapon.status === 'used')[0] : null)

export const $featureWeaponStore = createStore<WeaponType | null>(null)

sample({
    clock: $usedWeaponStore,
    filter: (weapon): weapon is TWeapon => weapon !== null,
    fn: (weapon: TWeapon) => determinantWeapon(weapon.weapon, weapon.level),
    target: $featureWeaponStore
})

const useWeapon = () => {
    return {
        weapons: useStore($weaponStore),
        usedWeapon: useStore($usedWeaponStore),
        featureWeapon: useStore($featureWeaponStore)
    }
}

export const selectors = {
    useWeapon,
}