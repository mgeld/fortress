export type TPointer = {
    userId: number
    health: number,
    icon?: string,
    pos: TLatLng
}

export type THitPointer = {
    userId: number
    pos: TLatLng
}

export type TJoystickDirection = "FORWARD" | "RIGHT" | "LEFT" | "BACKWARD"

export type TLatLng = [number, number]

export type TWeaponSymbol =
    | 'gun'

export type TWeapon = {
    id: string
    weapon: TWeaponSymbol
    bullets: number
    level: number
    status: 'used' | 'stock'
}
