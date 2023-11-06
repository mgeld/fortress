import { TWeaponSymbol } from "../../common-types/model"
import { Gun } from "./gun"

export type UnmarshalledWeapon = {
    id: string
    weapon: TWeaponSymbol
    level: number
    bullets: number
    power: number
    distance: number
    status: 1 | 0
}

export type TWeaponProps = {
    id: string,
    level?: number
    power?: number
    distance?: number
    bullets?: number
    status?: 1 | 0
}

export type TWeaponStatus = 'used' | 'stock'

export type WeaponType = Gun