import { createStore } from "effector"
import { useStore } from "effector-react"
import { battleAPI } from "shared/api/events"
import { TArena, TBattleStatus, TDeadEvent, TTeam } from "shared/api/events/battle"

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
                pointers: team.pointers.filter(item => item !== dead.pointer)
            }
        }
        return team
    }))


export const selectors = {
    useArena,
    useTeams,
    useBattleStatus
}