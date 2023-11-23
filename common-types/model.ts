export type TPointer = {
    userId: number
    lvl: number,
    health: number,
    icon?: string,
    name?: string,
    pos: TLatLng
}

export type THitPointer = {
    userId: number
    pos: TLatLng
    health?: number
}

export type TJoystickDirection = "FORWARD" | "RIGHT" | "LEFT" | "BACKWARD"

export type TLatLng = [number, number]

// Оружие дрона
export type TWeaponSymbol =
    | 1

export type TWeapon = {
    id: string
    weapon: TWeaponSymbol
    power: number
    distance: number
    bullets: number
    level: number
    status: 1 | 0
}

// Мины
export type TBombSymbol =
    | 'aerial'

export type TBomb = {
    id: string
    bomb: number
    counter: number
    level: number
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

// Типы добыч
export type TExtrTypes =
    | 10 | 11 | 12
    | 20 | 21 | 22
    | 30 | 31 | 32
    | 40 | 41 | 42
    | 50 | 51 | 52
    | 100 | 101
    | 110 | 111
    | 120 | 121


export type TTypeToastNotice =
    | TExtrTypes
    | TConts
    | 'rank'
    | 'level-zone'
    | 'level-up'
    | 'common' // common
    | 'warning' // warning

export type TConts = 'cont_1' | 'cont_2' | 'cont_3'

export type TExtrTypesName =
    | 'rank_exp'
    | 'storm_power'
    | 'ship_health'
    | 'gun_power'
    | 'gun_distance'
    | 'stormtroopers'
    | 'coins'
    | 'rubies'

export type TFindContType = 1 | 2 | 3

export type TGameUnit =
    | 'ship'
    | 'hold'
    | 'gun'
    | 'storm-corps'

export type TTutType =
    | 'ship'
    | 'storm'
    | 'projector'
    | 'gun'
    | 'hold'