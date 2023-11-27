import {
    TLatLng,
    THitPointer,
    TJoystickDirection,
    TExtrTypes,
    TGameUnit,
} from "../model"

export type TEventConnect = 'connect'

export type TEventDirect = 'direct'
export type TEventFire = 'fire'

export type TEventTake = 'take'
export type TEventBattleTake = 'battleTake'

export type TEventBeam = 'beam'

export type TEventUseExtraction = 'useExtraction'
export type TEventLevelUp = 'levelUp'
export type TEventBuyUnit = 'buyUnit'

export type TEventGetSectors = 'getSectors'
export type TEventGetAboutSector = 'getAboutSector'
export type TEventBattleGetAboutSector = 'battleGetAboutSector'


export type TEventBattleJoin = 'battleJoin'
export type TEventBattleLeave = 'battleLeave'
export type TEventBattleFire = 'battleFire'
export type TEventBattleDirect = 'battleDirect'

export type TEventGetUser = 'getUser'


export type TEventsAPI =
    | TEventConnect
    | TEventFire
    | TEventTake
    | TEventBattleTake
    | TEventBeam
    | TEventUseExtraction
    | TEventLevelUp
    | TEventBuyUnit
    | TEventGetSectors
    | TEventGetAboutSector
    | TEventBattleGetAboutSector
    | TEventDirect
    | TEventBattleJoin
    | TEventBattleLeave
    | TEventBattleFire
    | TEventBattleDirect
    | TEventGetUser

export type TSendEvent =
    | TConnectAPI
    | TFireAPI
    | TTakeAPI
    | TBeamAPI
    | TUseExtractionAPI
    | TLevelUpAPI
    | TBuyUnitAPI
    | TGetSectorsAPI
    | TGetAboutSectorAPI
    | TBattleGetAboutSectorAPI
    | TDirectAPI
    | TBattleJoinAPI
    | TBattleLeaveAPI
    | TBattleFireAPI
    | TBattleDirectAPI
    | TGetUserAPI

//----------------------------

export type TConnectAPI = {
    event: TEventConnect
    payload: {
        url: string
        name: string
        icon: string
        position: TLatLng
    }
}

export type TGetUserAPI = {
    event: TEventGetUser
    payload: {}
}

export type TFireAPI = {
    event: TEventFire
    payload: {
        pos: TLatLng
        to_pos: TLatLng
        direction: TJoystickDirection | null
        // weapon: string
        // userId: number
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
export type TBattleGetAboutSectorAPI = {
    event: TEventBattleGetAboutSector
    payload: {
        id: string
        arena: string
    }

}

export type TTakeAPI = {
    event: TEventTake | TEventBattleTake
    payload: {
        fort: TLatLng
        sector: string
    }
}

export type TBeamAPI = {
    event: TEventBeam
    payload: {
        position: TLatLng
        fort: TLatLng
        sector: string
        // userId: number
    }
}

export type TUseExtractionAPI = {
    event: TEventUseExtraction
    payload: {
        id: TExtrTypes
        index: number
    }
}

export type TLevelUpAPI = {
    event: TEventLevelUp
    payload: {
        type: TGameUnit
    }
}

export type TBuyUnitAPI = {
    event: TEventBuyUnit
    payload: {
        id: TExtrTypes
    }
}



export type TDirectAPI = {
    event: TEventDirect
    payload: {
        position: TLatLng
        // userId: number
    }
}

//----------------------------

export type TBattleFireAPI = {
    event: TEventBattleFire
    payload: {
        pos: TLatLng
        to_pos: TLatLng
        direction: TJoystickDirection | null
        hitPointer?: THitPointer
        // weapon: string
        // userId: number
    }
}

export type TBattleDirectAPI = {
    event: TEventBattleDirect
    payload: {
        position: TLatLng
        // userId: number
    }
}

export type TBattleJoinAPI = {
    event: TEventBattleJoin
    payload: {
        // userId: number
    }
}
export type TBattleLeaveAPI = {
    event: TEventBattleLeave
    payload: {
        // userId: number
    }
}