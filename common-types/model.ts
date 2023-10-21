export type TPointer = {
    userId: number
    health: number,
    icon?: string,
    name?: string,
    pos: TLatLng
}

export type THitPointer = {
    userId: number
    pos: TLatLng
}

export type TJoystickDirection = "FORWARD" | "RIGHT" | "LEFT" | "BACKWARD"

export type TLatLng = [number, number]


// Оружие дрона
export type TWeaponSymbol =
    | 'gun'

export type TWeapon = {
    id: string
    weapon: number
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
export type TExtrTypes = 1 | 2 | 3 | 4

export type TTypeToastNotice =
    | 'common' // common
    | 'coins' // coins
    | 'rubies' // rubies
    | 'exp-rank' // exp-rank
    // | 'exp-storm' // exp-storm
    // | 'exp-guard' // exp-guard
    | 'level-rank' // level-rank
    | 'level-storm' // level-storm
    | 'level-guard' // level-guard
    | 'level-zone' // level-zone

export type TFindContType = 1 | 2 | 3