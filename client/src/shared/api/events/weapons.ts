import { TWeapon } from "@ctypes/model";
import { createEvent } from "effector";


// type TSetWeaponsProps = { weapon: number } & Omit<TWeapon, 'weapon'>

const setWeapons = createEvent<TWeapon[]>()

export const events = {
    setWeapons,
}