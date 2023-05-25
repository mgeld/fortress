import { createEvent, createStore } from "effector"
import { useStore } from "effector-react"
import { battleAPI } from "shared/api/events"
import { TBattleStatus } from "shared/api/events/battle"

type TTeam = {
    teamId: number
    status: 'default' | 'victory' | 'defeat'
    pointers: number[]
}

export type TArena = {
    id: string
    time_start: number
    teams: number[]
}

const DEFAULT_STORE: TArena | null = null

const setArena = createEvent<TArena>()

type TDeadEvent = {
    team: number
    pointer: number
}
const killPointer = createEvent<TDeadEvent>()

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

const { setBattleStatus } = battleAPI.events
const useBattleStatus = () => {
    return {
        data: useStore($battleStatus)
    }
}
const $battleStatus = createStore<TBattleStatus>('default')
    .on(setBattleStatus, (_, status) => status)

const $arenaStore = createStore<TArenaStore>(DEFAULT_STORE)
    .on(setArena, (_, arena: TArena) => arena)


const setTeams = createEvent<TTeam[]>()
const $teamStore = createStore<TTeam[]>([])
    .on(setTeams, (_, teams: TTeam[]) => teams)
    .on(killPointer, (prevTeams: TTeam[], dead: TDeadEvent) => prevTeams.map(team => {
        if (team.teamId === dead.team) {
            return {
                ...team,
                pointers: team.pointers.filter(item => item !== dead.pointer)
            }
        }
        return team
    })
    )


export const selectors = {
    useArena,
    useTeams,
    useBattleStatus
}