import { THitPointer, TJoystickDirection, TLatLng, TPointer, TWeapon, TWeaponSymbol, TZoneItem } from "../model"

export type TEventConnect = 'connect'
export type TEventSetUser = 'set-user'
export type TEventSetCitadel = 'set-citadel'

export type TEventConnectPointer = 'connect-pointer'
export type TEventDelPointer = 'del-pointer'
export type TEventDirect = 'direct'
export type TEventPointers = 'pointers'
export type TEventFire = 'fire'
export type TEventTake = 'take'
export type TEventTakeHit = 'take-hit'
export type TEventTakeSector = 'take-sector'

export type TEventSectors = 'sectors'
export type TEventSector = 'sector'

export type TEventBattleStart = 'battle-start'
export type TEventBattleOver = 'battle-over'
export type TEventBattleJoin = 'battle-join'

export type TEventsMessage =
    | TEventConnect
    | TEventSetUser
    | TEventSetCitadel
    | TEventFire
    | TEventTake
    | TEventTakeHit
    | TEventTakeSector
    | TEventPointers
    | TEventConnectPointer
    | TEventDelPointer
    | TEventDirect
    | TEventBattleStart
    | TEventBattleOver
    | TEventBattleJoin
    | TEventSectors
    | TEventSector

export type TCitadel = {
    id: number
    latlng: TLatLng
    level: number
} | null

export type TConnectPayload = {
    user: {
        pos: TLatLng
        health: number
    },
    zone: {
        sectors: number
        trophies: number
        coins: number
        rubies: number
    }
    citadel: TCitadel
    weapon: TWeapon[]
}
export type TConnect = {
    event: TEventConnect
    payload: TConnectPayload
}

export type TSetCitadel = {
    event: TEventSetCitadel
    payload: TCitadel
}


export type TResetUser = {
    pos: TLatLng
    health: number
}
type TSetUserPayload = {
    user: TResetUser
}
export type TSetUser = {
    event: TEventSetUser
    payload: TSetUserPayload
}


type TConnectPointerPayload = {
    userId: number
    pos: TLatLng
    health: number
}
export type TConnectPointer = {
    event: TEventConnectPointer
    payload: TConnectPointerPayload
}


type TDelPointerPayload = {
    userId: number
}
export type TDelPointer = {
    event: TEventDelPointer
    payload: TDelPointerPayload
}


type TDirectPointerPayload = {
    userId: number
    pos: TLatLng
}
export type TDirectPointer = {
    event: TEventDirect
    payload: TDirectPointerPayload
}


type TPointersPayload = {
    pointers: TPointer[]
}
export type TPointers = {
    event: TEventPointers
    payload: TPointersPayload
}


export type TTakePayload = {
    position: TLatLng
    fort: TLatLng
    userId: number
}
export type TTake = {
    event: TEventTake
    payload: TTakePayload
}


export type TTakeHitPayload = {
    status: 'victory' | 'defeat' | 'defense'
    invaders: number
    defenders: number
    fort: TLatLng
}
export type TTakeHit = {
    event: TEventTakeHit
    payload: TTakeHitPayload
}


export type TTakeSectorPayload = {
    prev_owner_id: number
    new_owner_id: number
    sector_id: string
}
export type TTakeSector = {
    event: TEventTakeSector
    payload: TTakeSectorPayload
}



export type TSectorsPayload = TZoneItem[]
export type TSectors = {
    event: TEventSectors
    payload: TSectorsPayload
}

export type TSectorPayload = {
    number: number
    areal: number
    invaders: number
    defenders: number
}
export type TSector = {
    event: TEventSector
    payload: TSectorPayload
}


export type TFirePayload = {
    position: TLatLng
    direction: TJoystickDirection | null
    userId: number
    weapon: {
        symbol: TWeaponSymbol
        level: number
    }
    hitPointer?: THitPointer
}
export type TFire = {
    event: TEventFire
    payload: TFirePayload
}


export type TBattleStartPayload = {
    battleId: string
    place: TLatLng
    timeStart: number
    teams: TTeam[]
    pointers: TPointer[]
}
export type TBattleStart = {
    event: TEventBattleStart
    payload: TBattleStartPayload
}

type TMember = {
    userId: number,
    trophies: number
}

export type TTeam = {
    teamId: number
    status: 'default' | 'victory' | 'defeat'
    members: TMember[]
}

export type TBattleOverPayload = {
    teams: TTeam[]
}
export type TBattleOver = {
    event: TEventBattleOver
    payload: TBattleOverPayload
}


type TBattleJoinPayload = {
    user: {
        pos: TLatLng
        health: number
    }
}
export type TBattleJoin = {
    event: TEventBattleJoin
    payload: TBattleJoinPayload
}


export type TMessage =
    | TConnectPointer
    | TConnect
    | TSetUser
    | TSetCitadel
    | TDelPointer
    | TDirectPointer
    | TPointers
    | TSectors
    | TSector
    | TFire
    | TTake
    | TTakeHit
    | TTakeSector
    | TBattleStart
    | TBattleOver
    | TBattleJoin