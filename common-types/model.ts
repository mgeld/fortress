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
    // weapon: TWeaponSymbol
    weapon: number
    bullets: number
    level: number
    // status: 'used' | 'stock'
    status: 1 | 0
}


// Секторы. Вывод
export type TSectors = string[]

export type TZoneColor = 1 | 2 | 3 | 4 | 5 | 6

export type TZone = {
    zone_id: number
    name: string
    color: TZoneColor
}
export type TZoneItem = {
    zone: TZone
    sectors: TSectors
}