import { TWeapon, TWeaponSymbol } from "@ctypes/model";
import { createEvent } from "effector";

// type TSetWeaponsProps = { weapon: number } & Omit<TWeapon, 'weapon'>

const setWeapons = createEvent<TWeapon[]>()

export type TDist = {
    symbol: TWeaponSymbol
    dist: number
}
const setDistance = createEvent<TDist>()

export const events = {
    setWeapons,
    setDistance
}