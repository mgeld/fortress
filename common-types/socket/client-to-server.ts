import { THitPointer, TJoystickDirection, TLatLng } from "../model"

export type TEventConnect = 'connect'

export type TEventDirect = 'direct'
export type TEventFire = 'fire'

export type TEventBattleJoin = 'battleJoin'
export type TEventBattleFire = 'battleFire'
export type TEventBattleDirect = 'battleDirect'

export type TEventsAPI =
    | TEventConnect
    | TEventFire
    | TEventDirect
    | TEventBattleJoin
    | TEventBattleFire
    | TEventBattleDirect

export type TSendEvent =
    | TConnectAPI
    | TFireAPI
    | TDirectAPI
    | TBattleJoinAPI
    | TBattleFireAPI
    | TBattleDirectAPI

//----------------------------

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
        position: TLatLng
        userId: number
    }
}

//----------------------------

export type TBattleFireAPI = {
    event: TEventBattleFire
    payload: {
        position: TLatLng
        direction: TJoystickDirection | null
        weapon: string,
        userId: number
        hitPointer?: THitPointer
    }
}

export type TBattleDirectAPI = {
    event: TEventBattleDirect
    payload: {
        position: TLatLng
        userId: number
    }
}

export type TBattleJoinAPI = {
    event: TEventBattleJoin
    payload: {
        userId: number
    }
}