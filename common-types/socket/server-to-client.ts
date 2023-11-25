import { TBombSymbol, TExtrTypes, TExtrTypesName, TFindContType, TGameUnit, THitPointer, TJoystickDirection, TLatLng, TPointer, TTutType, TTypeToastNotice, TWeapon, TWeaponSymbol, TZoneItem } from "../model"

export type TEventConnect = 'connect'
export type TEventSetUser = 'set-user'
export type TEventSetCitadel = 'set-citadel'
export type TEventTutorial = 'tutorial'

export type TEventConnectPointer = 'connect-pointer'
export type TEventDelPointer = 'del-pointer'
export type TEventDirect = 'direct'
export type TEventPointers = 'pointers'
export type TEventFire = 'fire'
export type TEventBomb = 'bomb'
export type TEventTake = 'take'
export type TEventTakeHit = 'take-hit'
export type TEventFindCont = 'find-cont'
export type TEventTractorExtr = 'attraction'
export type TEventUseExtraction = 'use-extraction'
export type TEventLimit = 'limit'
export type TEventSession = 'session'


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

export type TEventSectors = 'sectors'
export type TEventSector = 'sector'

export type TEventBattleStart = 'battle-start'
export type TEventBattleOver = 'battle-over'
export type TEventBattleJoin = 'battle-join'

export type TEventsMessage =
    | TEventConnect
    | TEventSetUser
    | TEventSetCitadel
    | TEventTutorial
    | TEventFire
    | TEventBomb
    | TEventTake
    | TEventTakeHit
    | TEventFindCont
    | TEventTractorExtr
    | TEventUseExtraction
    | TEventLimit
    | TEventSession
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
        zoneId: number
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
        trophies: number
        coins: number
        rubies: number
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


export type TTractorExtr = {
    event: TEventTractorExtr
    payload: {
        extr: TExtrTypes | null
        cont: TFindContType | 0
        fort: TLatLng | null
        pos: TLatLng
    }
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

export type TLimit = {
    event: TEventLimit
    payload: {
        gives: TExtrTypesName | 'hold'
    }
}


export type TSession = {
    event: TEventSession
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
    event: TEventSectors
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
    direction: TJoystickDirection | null
    userId: number
    hitPointer?: THitPointer
}
export type TFire = {
    event: TEventFire
    payload: TFirePayload
}

export type TBombPayload = {
    position: TLatLng
    userId: number
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
}

export type TTeam = {
    teamId: number
    status: 'default' | 'victory' | 'defeat'
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


type TBattleJoinPayload = {
    user: {
        pos: TLatLng
        team: number
        // health: number
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
    | TTutorial
    | TDelPointer
    | TDirectPointer
    | TPointers
    | TSectors
    | TSector
    | TFire
    | TBomb
    | TTake
    | TTakeHit
    | TFindCont
    | TTractorExtr
    | TUseExtraction
    | TLimit
    | TSession
    | TNewRank
    | TNewZone
    | TLevelUp
    | TBuyUnit
    | TTakeSector
    | TBattleTakeSector
    | TBattleStart
    | TBattleOver
    | TBattleJoin