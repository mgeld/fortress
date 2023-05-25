import { THitPointer, TJoystickDirection, TLatLng, TPointer, TWeapon, TWeaponSymbol } from "../model"

export type TEventConnect = 'connect'
export type TEventConnectPointer = 'connect-pointer'
export type TEventDelPointer = 'del-pointer'
export type TEventDirect = 'direct'
export type TEventPointers = 'pointers'
export type TEventFire = 'fire'
export type TEventBattle = 'battle-start'

export type TEventsMessage =
    | TEventConnect
    | TEventFire
    | TEventPointers
    | TEventConnectPointer
    | TEventDelPointer
    | TEventDirect
    | TEventBattle


type TConnectPayload = {
    user: {
        pos: TLatLng
        health: number
    },
    weapon: TWeapon[]
}
export type TConnect = {
    event: TEventConnect
    payload: TConnectPayload
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

export type TBattlePayload = {
    battleId: string,
    pointers: TPointer[]
}
export type TBattle = {
    event: TEventBattle
    payload: TBattlePayload
}

export type TMessage =
    | TConnectPointer
    | TConnect
    | TDelPointer
    | TDirectPointer
    | TPointers
    | TFire
    | TBattle