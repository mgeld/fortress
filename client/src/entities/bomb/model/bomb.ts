import { createStore } from "effector"
import { useStore } from "effector-react"
import { bombsAPI } from "shared/api/events"
import { TBombId } from "shared/api/events/bombs"
import { TLatLng } from "shared/types"

export type TBomb = {
    id: number,
    pos: TLatLng
    radius: number
}

const DEFAULT_STORE: TBomb[] = []

const {
    setBombs,
    delBombById,
    addBomb
} = bombsAPI.events

const $bombsStore = createStore<TBomb[]>(DEFAULT_STORE)
    .on(setBombs, (_, bombs: TBomb[]) => bombs)
    .on(addBomb, (bombs: TBomb[], bomb: TBomb) => ([...bombs, bomb]))
    .on(delBombById, (bombs: TBomb[], bomb: TBombId) => (bombs.slice().filter(item => {
        if (item.id === bomb.bomb_id)
            return false;
        return true;
    })))

export const useBomb = () => {
    return {
        bombs: useStore($bombsStore)
    }
}

export const selectors = {
    useBomb,
}