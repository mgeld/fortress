import { TTeam } from "@ctypes/socket/server-to-client"
import { createStore } from "effector"
import { useStore } from "effector-react"
import { battleAPI } from "shared/api/events"
import { TArena, TBattleStatus, TDeadEvent } from "shared/api/events/battle"

const DEFAULT_STORE: TArena | null = null

type TArenaStore = TArena | null

const useArena = () => {
    return {
        data: useStore($arenaStore)
    }
}

const useTeams = () => {
    return {
        data: useStore($teamStore)
    }
}
const useMyTeamId = () => {
    return {
        data: useStore($myTeamId)
    }
}

const useBattleStatus = () => {
    return {
        data: useStore($battleStatusStore)
    }
}

const useBattleTimer = () => {
    return {
        data: useStore($arenaTimer)
    }
}

const {
    setArena,
    setTeams,
    killPointer,
    setBattleStatus,
    setMyTeam,
    addSector,
    loseSector,
    setTimer,
    stepTimer
} = battleAPI.events

export const $battleStatusStore = createStore<TBattleStatus>('default')
    .on(setBattleStatus, (_, status) => status)

const $arenaTimer = createStore<number>(0)
    .on(setTimer, (_, time) => time)
    .on(stepTimer, (time, _) => time - 1)

const $arenaStore = createStore<TArenaStore>(DEFAULT_STORE)
    .on(setArena, (_, arena: TArena) => arena)

const $teamStore = createStore<TTeam[]>([])
    .on(setTeams, (_, teams: TTeam[]) => teams)
    .on(killPointer, (prevTeams: TTeam[], dead: TDeadEvent) => prevTeams.map(team => {
        if (team.teamId === dead.team) {
            return {
                ...team,
                members: team.members.filter(item => item.userId !== dead.pointer)
            }
        }
        return team
    }))
    .on(addSector, (prevTeams: TTeam[], sector) => prevTeams.map(team => {
        if (team.teamId === sector.team) {
            return {
                ...team,
                sectors: team.sectors + 1
            }
        }
        return team
    }))
    .on(loseSector, (prevTeams: TTeam[], sector) => prevTeams.map(team => {
        if (team.teamId === sector.team) {
            return {
                ...team,
                sectors: team.sectors - 1
            }
        }
        return team
    }))

const $myTeamId = createStore<number | null>(null)
    .on(setMyTeam, (_, team) => team)

// type TChangeSectors = {
//     myTeam: 1 | 2 | null
//     teams: TTeam[]
// }

// const changeSectorsFx = createEffect(({
//     myTeam,
//     teams
// }: TChangeSectors) => {

//     if (!myTeam) return teams

//     return teams.map(team => {
//         if (team.teamId === myTeam) {
//             return {
//                 ...team,
//                 sectors: team.sectors + 1
//             }
//         }
//         return team
//     })

// })

// sample({
//     clock: addSector,
//     source: {
//         myTeam: $myTeamId,
//         teams: $teamStore,
//     },
//     // filter: ({ myTeam }) => myTeam !== null,
//     target: changeSectorsFx
// })

// sample({
//     clock: changeSectorsFx.doneData,
//     target: $teamStore
// })

export const selectors = {
    useArena,
    useTeams,
    useMyTeamId,
    useBattleStatus,

    useBattleTimer
}