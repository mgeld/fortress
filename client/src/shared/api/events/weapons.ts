import { TWeapon } from "@ctypes/model";
import { createEvent } from "effector";

const setWeapons = createEvent<TWeapon[]>()

export const events = {
    setWeapons,
}