import { IRatingZone, TBombSymbol, TExtrTypes, TExtrTypesName, TFindContType, TGameUnit, THitPointer, TJoystickDirection, TLatLng, TPointer, TTutType, TTypeToastNotice, TWeapon, TWeaponSymbol, TZoneAbduction, TZoneColor, TZoneItem } from "../model"

export type TEventConnect = 'connect'
export type TEventSetUser = 'set-user'
export type TEventEditZone = 'edit-zone'

export type TEventSetRating = 'set-rating'
export type TEventSetAbduction = 'set-abduction'
export type TEventSetZone = 'set-zone'


export type TEventSetCitadel = 'set-citadel'
export type TEventTutorial = 'tutorial'

export type TEventConnectPointer = 'connect-pointer'
export type TEventDelPointer = 'del-pointer'
export type TEventDirect = 'direct'
export type TEventPointers = 'pointers'
export type TEventFire = 'fire'
export type TEventSetHealth = 'set-health'
export type TEventBomb = 'bomb'
export type TEventTake = 'take'
export type TEventTakeHit = 'take-hit'
export type TEventFindCont = 'find-cont'
export type TEventTractorUnit = 'attraction'
export type TEventUseExtraction = 'use-extraction'
export type TEventDelExtraction = 'del-extraction'
export type TEventReward = 'reward'

export type TEventLimit = 'limit'
export type TEventSession = 'session'
export type TEventSessionDestroy = 'session-destroy'

export type TEventNewRank = 'new-rank'
export type TEventNewZone = 'new-zone'

export type TEventLevelUp = 'level-up'
export type TEventBuyUnit = 'buy-unit'

export type TEventTakeSector = 'take-sector'
export type TEventYTakeSector = 'y-take-sector'
export type TEventYrTakeSector = 'yr-take-sector'

export type TEventBattleTakeSector = 'battle-take-sector'
export type TEventBattleYTakeSector = 'battle-y-take-sector'
export type TEventBattleYrTakeSector = 'battle-yr-take-sector'

export type TEventAddSectors = 'add-sectors'
export type TEventSetSectors = 'set-sectors'
export type TEventSector = 'sector'

export type TEventBattleStart = 'battle-start'
export type TEventBattleOver = 'battle-over'
export type TEventBattleId = 'battle-id'
export type TEventBattleJoin = 'battle-join'

export type TEventsMessage =
    | TEventConnect
    | TEventSetUser
    | TEventEditZone
    | TEventSetRating
    | TEventSetAbduction
    | TEventSetZone
    | TEventSetCitadel
    | TEventTutorial
    | TEventFire
    | TEventSetHealth
    | TEventBomb
    | TEventTake
    | TEventTakeHit
    | TEventFindCont
    | TEventTractorUnit
    | TEventUseExtraction
    | TEventDelExtraction
    | TEventReward
    | TEventLimit
    | TEventSession
    | TEventSessionDestroy
    | TEventNewRank
    | TEventNewZone
    | TEventLevelUp
    | TEventBuyUnit

    | TEventTakeSector
    | TEventYTakeSector
    | TEventYrTakeSector

    | TEventBattleTakeSector
    | TEventBattleYTakeSector
    | TEventBattleYrTakeSector

    | TEventPointers
    | TEventConnectPointer
    | TEventDelPointer
    | TEventDirect
    | TEventBattleStart
    | TEventBattleOver
    | TEventBattleId
    | TEventBattleJoin
    | TEventAddSectors
    | TEventSetSectors
    | TEventSector

export type TCitadel = {
    id: number
    latlng: TLatLng
    level: number
} | null

export type TConnectPayload = {
    user: {
        zoneId: number
        icon: string
        name: string
    },
    ship: {
        pos: TLatLng
        level: number
        health: number
    }
    storm: {
        level: number
        power: number
        invaders: number
    }
    rank: {
        level: number
        exp: number
    }
    terrain: {
        level: number
        sectors: number
    }
    zone: {
        color: TZoneColor
        trophies: number
        coins: number
        rubies: number
        description: string
    }
    hold: {
        level: number
        items: TExtrTypes[]
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

export type TTutorial = {
    event: TEventTutorial
    payload: {
        type: TTutType
    }
}

export type TResetUser = {
    pos?: TLatLng
    health?: number
}
type TSetUserPayload = {
    user: TResetUser
}
export type TSetUser = {
    event: TEventSetUser
    payload: TSetUserPayload
}

export type TEditZone = {
    event: TEventEditZone
    payload: {
        icon?: string
        name?: string
        description?: string
        color?: TZoneColor
    }
}

type TSetRatingPayload = {
    zones: IRatingZone[]
}
export type TSetRating = {
    event: TEventSetRating
    payload: TSetRatingPayload
}

type TSetAbductionPayload = {
    zones: TZoneAbduction[]
}
export type TSetAbduction = {
    event: TEventSetAbduction
    payload: TSetAbductionPayload
}

export type TSetZone = {
    event: TEventSetZone
    payload: IRatingZone
}

// type TConnectPointerPayload = {
//     userId: number
//     icon: string
//     name: string
//     pos: TLatLng
//     health: number
// }

export type TConnectPointer = {
    event: TEventConnectPointer
    payload: TPointer
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
    owner: number
}
export type TTakeHit = {
    event: TEventTakeHit
    payload: {
        hit: TTakeHitPayload
        extr?: number
    }
}

export type TFindContPayload = {
    fort: TLatLng
    cont: TFindContType
}

export type TFindCont = {
    event: TEventFindCont
    payload: TFindContPayload
}

type TTractorUnitPayloadCont = {
    type: 'strm'
    data: null
    fort: TLatLng
    pos: TLatLng
}
type TTractorUnitPayloadStrm = {
    type: 'cont'
    data: {
        cont: TFindContType
        extr: TExtrTypes
    }
    fort: TLatLng
    pos: TLatLng
}
type TTractorUnitPayloadNull = {
    type: null
    data: null
    fort: TLatLng
    pos: TLatLng
}

export type TTractorUnit = {
    event: TEventTractorUnit
    payload:
    | TTractorUnitPayloadCont
    | TTractorUnitPayloadStrm
    | TTractorUnitPayloadNull
}

export type TUseExtraction = {
    event: TEventUseExtraction
    payload: {
        unit: TExtrTypes
        type: TExtrTypesName
        amount: number
        index: number
    }
}

export type TDelExtraction = {
    event: TEventDelExtraction
    payload: {
        unit: TExtrTypes
        index: number
    }
}


export type TReward = {
    event: TEventReward
    payload: {
        type: 'coins' | 'rubies'
        amount: number
    }
}


// export type TLimitLevelTypes =  | 'ship_level'
//                                 | 'hold_level'
//                                 | 'gun_level'
//                                 | 'storm_level'
export type TLimit = {
    event: TEventLimit
    payload: {
        gives: | TExtrTypesName
        | 'hold'
        // | TLimitLevelTypes

    }
}


export type TSession = {
    event: TEventSession
    payload: {
    }
}
export type TSessionDestroy = {
    event: TEventSessionDestroy
    payload: {
    }
}

export type TNewRank = {
    event: TEventNewRank
    payload: {
        rank: number
    }
}
export type TNewZone = {
    event: TEventNewZone
    payload: {
        level: number
    }
}


export type TLevelUp = {
    event: TEventLevelUp
    payload: {
        type: TGameUnit
        cost: number
        new_level: number
        currency: 'coins' | 'rubies'
    }
}


export type TBuyUnit = {
    event: TEventBuyUnit
    payload: {
        type: TTypeToastNotice
        cost: number
        currency: 'coins' | 'rubies'
        unit: TExtrTypes
    }
}


export type TTakeSectorPayload = {
    prev_owner_id: number
    new_owner_id: number
    sector_id: string
    area: number
    exp?: number // Опыт завоеваний за захват сектора
    trp?: number // Трофеи за захват сектора
}
export type TTakeSector = {
    event: TEventTakeSector | TEventYTakeSector | TEventYrTakeSector
    payload: TTakeSectorPayload
}

export type TBattleTakeSector = {
    event: TEventBattleTakeSector | TEventBattleYTakeSector | TEventBattleYrTakeSector
    payload: TTakeSectorPayload
}



export type TSectorsPayload = TZoneItem[]
export type TSectors = {
    event: TEventAddSectors | TEventSetSectors
    payload: TSectorsPayload
}

export type TSectorPayload = {
    number: number
    latlng: TLatLng
    invaders: number
    defenders: number
    owner: string
}
export type TSector = {
    event: TEventSector
    payload: TSectorPayload
}

export type TFirePayload = {
    pos: TLatLng
    to_pos: TLatLng
    direction: number
    userId: number
    hitPointer?: THitPointer
}
export type TFire = {
    event: TEventFire
    payload: TFirePayload
}

export type TSetHealthPayload = {
    userId: number
    health: number
}
export type TSetHealth = {
    event: TEventSetHealth
    payload: TSetHealthPayload
}

export type TBombPayload = {
    position: TLatLng
    userId: number
    health: number
    bomb: {
        symbol: TBombSymbol
        level: number
    }
}
export type TBomb = {
    event: TEventBomb
    payload: TBombPayload
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
    coins: number
}


export type TTeamStatus = 'default' | 'victory' | 'defeat' | 'draw'
export type TTeam = {
    teamId: number
    status: TTeamStatus
    members: TMember[]
    sectors: number
}

export type TBattleOverPayload = {
    teams: TTeam[]
}
export type TBattleOver = {
    event: TEventBattleOver
    payload: TBattleOverPayload
}

export type TBattleId = {
    event: TEventBattleId
    payload: {
        id: string
    }
}


type TBattleJoinPayload = {
    status: 'search' | 'wait' | 'over' | 'start'
    user?: {
        pos: TLatLng
        team: number
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
    | TEditZone
    | TSetRating
    | TSetAbduction
    | TSetCitadel
    | TTutorial
    | TDelPointer
    | TDirectPointer
    | TPointers
    | TSectors
    | TSector
    | TFire
    | TSetHealth
    | TBomb
    | TTake
    | TTakeHit
    | TFindCont
    | TTractorUnit
    | TUseExtraction
    | TDelExtraction
    | TReward
    | TLimit
    | TSession
    | TSessionDestroy
    | TNewRank
    | TNewZone
    | TLevelUp
    | TBuyUnit
    | TTakeSector
    | TBattleTakeSector
    | TBattleStart
    | TBattleOver
    | TBattleId
    | TBattleJoin
    | TSetZone