import { THitPointer, TJoystickDirection, TLatLng } from "../model"

export type TEventConnect = 'connect'
export type TEventDirect = 'direct'
export type TEventFire = 'fire'
export type TEventBattle = 'battleJoin'

export type TEventsAPI =
    | TEventFire
    | TEventConnect
    | TEventDirect
    | TEventBattle

export type TSendEvent =
    | TConnectAPI
    | TFireAPI
    | TDirectAPI
    | TBattleAPI

export type TConnectAPI = {
    event: TEventConnect
    payload: {
        position: TLatLng
        userId: number
    }
}

export type TFireAPI = {
    event: TEventFire
    payload: {
        arena?: string
        position: TLatLng
        direction: TJoystickDirection | null
        weapon: string,
        userId: number
        hitPointer?: THitPointer
    }
}

export type TDirectAPI = {
    event: TEventDirect
    payload: {
        arena?: string
        position: TLatLng
        userId: number
    }
}

export type TBattleAPI = {
    event: TEventBattle
    payload: {
        userId: number
    }
}