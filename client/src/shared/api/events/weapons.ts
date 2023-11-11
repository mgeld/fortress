import { TWeaponSymbol } from "@ctypes/model";
import { createEvent } from "effector";

// type TSetWeaponsProps = { weapon: number } & Omit<TWeapon, 'weapon'>

// const setWeapons = createEvent<TWeapon[]>()

// export type TDist = {
//     symbol: TWeaponSymbol
//     dist: number
// }

// export type TPower = {
//     symbol: TWeaponSymbol
//     power: number
// }

const setId = createEvent<string>()
const setDistance = createEvent<number>()
const increaseDistance = createEvent<number>()
const setPower = createEvent<number>()
const increasePower = createEvent<number>()
const setLevel = createEvent<number>()
const setBullets = createEvent<number>()
const increaseBullets = createEvent<number>()

export const events = {
    // setWeapons,
    setId,
    setBullets,
    setDistance,
    increaseDistance,
    setPower,
    increasePower,
    setLevel,
    increaseBullets
}