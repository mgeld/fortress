import { TTeam } from "@ctypes/socket/server-to-client"
import { createEvent, createStore } from "effector"
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

const useBattleStatus = () => {
    return {
        data: useStore($battleStatusStore)
    }
}

const {
    setArena,
    setTeams,
    killPointer,
    setBattleStatus,
} = battleAPI.events

export const $battleStatusStore = createStore<TBattleStatus>('default')
    .on(setBattleStatus, (_, status) => status)

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


// const setUserTeamId = createEvent<number>()
// const $userTeamId = createStore<number>(0)
//     .on(setTeams, (_, teams) => {
//         teams.find(team => team.members.find())
//     })

export const selectors = {
    useArena,
    useTeams,
    useBattleStatus
}