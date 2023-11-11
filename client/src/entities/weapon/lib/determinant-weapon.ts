import { TWeaponSymbol } from "@ctypes/model"
import { Gun, WeaponType } from "./gun"

export const determinantWeapon = (symbol: TWeaponSymbol, level: number): WeaponType => {
    if (symbol === 1) {
        return Gun.level(level)
    } else {
        throw new Error('----')
    }
}