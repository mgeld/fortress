import { TTeam } from "@ctypes/socket/server-to-client";
import { createEvent } from "effector";
import { TLatLng } from "shared/types";

export type TBattleStatus = 'default' | 'pending' | 'start' | 'over'
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

export type TArena = {
    id: string
    time_start: number
    place: TLatLng
    // teams: number[]
}
const setArena = createEvent<TArena>()

export const events = {
    setArena,
    setTeams,
    killPointer,
    setBattleStatus,
}