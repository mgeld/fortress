import {
    TLatLng,
    THitPointer,
    TJoystickDirection,
} from "../model"

export type TEventConnect = 'connect'

export type TEventDirect = 'direct'
export type TEventFire = 'fire'
export type TEventTake = 'take'

export type TEventGetSectors = 'getSectors'
export type TEventGetAboutSector = 'getAboutSector'

export type TEventBattleJoin = 'battleJoin'
export type TEventBattleFire = 'battleFire'
export type TEventBattleDirect = 'battleDirect'

export type TEventGetUser = 'getUser'


export type TEventsAPI =
    | TEventConnect
    | TEventFire
    | TEventTake
    | TEventGetSectors
    | TEventGetAboutSector
    | TEventDirect
    | TEventBattleJoin
    | TEventBattleFire
    | TEventBattleDirect
    | TEventGetUser

export type TSendEvent =
    | TConnectAPI
    | TFireAPI
    | TTakeAPI
    | TGetSectorsAPI
    | TGetAboutSectorAPI
    | TDirectAPI
    | TBattleJoinAPI
    | TBattleFireAPI
    | TBattleDirectAPI
    | TGetUserAPI

//----------------------------

export type TConnectAPI = {
    event: TEventConnect
    payload: {
        position: TLatLng
        name: string
        userId: number
    }
}

export type TGetUserAPI = {
    event: TEventGetUser
    payload: {
        userId: number
    }
}

export type TFireAPI = {
    event: TEventFire
    payload: {
        position: TLatLng
        direction: TJoystickDirection | null
        weapon: string
        userId: number
        hitPointer?: THitPointer
    }
}

export type TGetSectorsAPI = {
    event: TEventGetSectors
    payload: {
        position: TLatLng
        userId: number
    }
}

export type TGetAboutSectorAPI = {
    event: TEventGetAboutSector
    payload: {
        id: string
    }
}

export type TTakeAPI = {
    event: TEventTake
    payload: {
        position: TLatLng
        fort: TLatLng
        sector: string
        userId: number
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
        weapon: string
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