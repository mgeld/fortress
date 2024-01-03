import { TTeam } from "@ctypes/socket/server-to-client";
import { createEvent } from "effector";
import { TLatLng } from "shared/types";

export type TBattleStatus = 'default' | 'wait' | 'search' | 'start' | 'over'
const setBattleStatus = createEvent<TBattleStatus>()

export type TDeadEvent = {
    team: number
    pointer: number
}
const killPointer = createEvent<TDeadEvent>()

// export type TTeam = {
//     teamId: number
//     status: 'default' | 'victory' | 'defeat'
//     pointers: number[]
// }
const setTeams = createEvent<TTeam[]>()

const setMyTeam = createEvent<number>()

export type TArena = {
    id: string
    time_start: number
    place: TLatLng
}

const setArena = createEvent<TArena>()

export type TTeamSectorEvent = {
    team: number
}
const addSector = createEvent<TTeamSectorEvent>()
const loseSector = createEvent<TTeamSectorEvent>()

const setTimer = createEvent<number>()
const stepTimer = createEvent()

const setBattleShareId= createEvent<string | null>()

export const events = {
    setArena,
    setTeams,
    killPointer,
    setBattleStatus,
    setMyTeam,

    addSector,
    loseSector,

    setTimer,
    stepTimer,

    setBattleShareId
}