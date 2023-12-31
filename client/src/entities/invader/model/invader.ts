import { createStore } from "effector"
import { useStore } from "effector-react"
import { takesAPI } from "shared/api/events"
import { TTakeId } from "shared/api/events/takes"
import { TLatLng } from "shared/types"

export type TTake = {
    id: number,
    from_pos: TLatLng
    to_pos: TLatLng
}

const DEFAULT_STORE: TTake[] = []

const {
    addTake,
    delTakeById,
} = takesAPI.events

const $invadersStore = createStore<TTake[]>(DEFAULT_STORE)
    .on(addTake, (invaders: TTake[], invader: TTake) => ([...invaders, invader]))
    .on(delTakeById, (invaders: TTake[], invader: TTakeId) => (invaders.slice().filter(item => {
        if (item.id === invader.take_id)
            return false;
        return true;
    })))

const useInvader = () => {
    return {
        takes: useStore($invadersStore)
    }
}

export const selectors = {
    useInvader,
}