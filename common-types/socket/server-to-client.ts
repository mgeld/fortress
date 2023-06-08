import { TTeam } from "../../client/src/shared/api/events/battle"
import { THitPointer, TJoystickDirection, TLatLng, TPointer, TWeapon, TWeaponSymbol } from "../model"

export type TEventConnect = 'connect'
export type TEventConnectPointer = 'connect-pointer'
export type TEventDelPointer = 'del-pointer'
export type TEventDirect = 'direct'
export type TEventPointers = 'pointers'
export type TEventFire = 'fire'

export type TEventBattleStart = 'battle-start'
export type TEventBattleOver = 'battle-over'
export type TEventBattleJoin = 'battle-join'

export type TEventsMessage =
    | TEventConnect
    | TEventFire
    | TEventPointers
    | TEventConnectPointer
    | TEventDelPointer
    | TEventDirect
    | TEventBattleStart
    | TEventBattleOver
    | TEventBattleJoin


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
    | TDelPointer
    | TDirectPointer
    | TPointers
    | TFire
    | TBattleStart
    | TBattleOver
    | TBattleJoin