import {
    TLatLng,
    THitPointer,
    TExtrTypes,
    TGameUnit,
    TZoneColor,
} from "../model"

export type TEventConnect = 'connect'
export type TEventEditZone = 'editZone'

export type TEventDirect = 'direct'
export type TEventFire = 'fire'

export type TEventTake = 'take'
export type TEventBattleTake = 'battleTake'

export type TEventBeam = 'beam'

export type TEventUseExtraction = 'useExtraction'
export type TEventDelExtraction = 'delExtraction'
export type TEventLevelUp = 'levelUp'
export type TEventBuyUnit = 'buyUnit'

export type TEventGetSectors = 'getSectors'
export type TEventGetSatellite = 'getSatellite'
export type TEventGetSatelliteFort = 'getSatelliteFort'

export type TEventGetAboutSector = 'getAboutSector'
export type TEventBattleGetAboutSector = 'battleGetAboutSector'


export type TEventBattleJoin = 'battleJoin'
export type TEventBattleLeave = 'battleLeave'
export type TEventBattleCreate = 'battleCreate'
export type TEventBattleFire = 'battleFire'
export type TEventBattleDirect = 'battleDirect'

export type TEventGetUser = 'getUser'
export type TEventGetZone = 'getZone'
export type TEventGetRating = 'getRating'
export type TEventGetAbduction = 'getAbduction'


export type TEventsAPI =
    | TEventConnect
    | TEventEditZone
    | TEventFire
    | TEventTake
    | TEventBattleTake
    | TEventBeam
    | TEventUseExtraction
    | TEventDelExtraction
    | TEventLevelUp
    | TEventBuyUnit
    | TEventGetSectors
    | TEventGetSatellite
    | TEventGetSatelliteFort
    | TEventGetAboutSector
    | TEventBattleGetAboutSector
    | TEventDirect
    | TEventBattleJoin
    | TEventBattleLeave
    | TEventBattleCreate
    | TEventBattleFire
    | TEventBattleDirect
    | TEventGetUser
    | TEventGetZone
    | TEventGetRating
    | TEventGetAbduction

export type TSendEvent =
    | TConnectAPI
    | TEditZoneAPI
    | TFireAPI
    | TTakeAPI
    | TBeamAPI
    | TUseExtractionAPI
    | TDelExtractionAPI
    | TLevelUpAPI
    | TBuyUnitAPI
    | TGetSectorsAPI
    | TGetSatelliteAPI
    | TGetSatelliteFortAPI
    | TGetAboutSectorAPI
    | TBattleGetAboutSectorAPI
    | TDirectAPI
    | TBattleJoinAPI
    | TBattleLeaveAPI
    | TBattleCreateAPI
    | TBattleFireAPI
    | TBattleDirectAPI
    | TGetUserAPI
    | TGetZoneAPI
    | TGetRatingAPI
    | TGetAbductionAPI

//----------------------------

export type TConnectAPI = {
    event: TEventConnect
    payload: {
        url: string
        // name: string
        // icon: string
        // position: TLatLng
        hash?: number
    }
}

export type TEditZoneAPI = {
    event: TEventEditZone
    payload: {
        icon: string,
        name: string,
        description: string,
        color: TZoneColor
        hash: string
    }
}

export type TGetUserAPI = {
    event: TEventGetUser
    payload: {}
}

export type TGetZoneAPI = {
    event: TEventGetZone
    payload: {
        id: number
    }
}

export type TGetRatingAPI = {
    event: TEventGetRating
    payload: {}
}

export type TGetAbductionAPI = {
    event: TEventGetAbduction
    payload: {
        zone_id: number
        page: number
    }
}


export type TFireAPI = {
    event: TEventFire
    payload: {
        pos: TLatLng
        to_pos: TLatLng
        direction: number
        // weapon: string
        // userId: number
        hitPointer?: THitPointer
    }
}

export type TGetSectorsAPI = {
    event: TEventGetSectors
    payload: {
        position: TLatLng
        // userId: number
    }
}

export type TGetSatelliteAPI = {
    event: TEventGetSatellite
    payload: {
        position: TLatLng
        zoneId: number
    }
}

export type TGetSatelliteFortAPI = {
    event: TEventGetSatelliteFort
    payload: {
        position: TLatLng
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

export type TDelExtractionAPI = {
    event: TEventDelExtraction
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
    }
}

//----------------------------

export type TBattleFireAPI = {
    event: TEventBattleFire
    payload: {
        pos: TLatLng
        to_pos: TLatLng
        direction: number
        hitPointer?: THitPointer
    }
}

export type TBattleDirectAPI = {
    event: TEventBattleDirect
    payload: {
        position: TLatLng
    }
}

export type TBattleJoinAPI = {
    event: TEventBattleJoin
    payload: {
        id?: string
    }
}
export type TBattleLeaveAPI = {
    event: TEventBattleLeave
    payload: {
    }
}

export type TBattleCreateAPI = {
    event: TEventBattleCreate
    payload: {
    }
}