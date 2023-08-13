import { createEvent, createStore } from "effector"
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

// const setTake = createEvent()

const {
    setTakes,
    addTake,
    delTakeById,
} = takesAPI.events

const $invadersStore = createStore<TTake[]>(DEFAULT_STORE)
    .on(setTakes, (_, invaders: TTake[]) => invaders)
    .on(addTake, (invaders: TTake[], invader: TTake) => ([...invaders, invader]))
    .on(delTakeById, (invaders: TTake[], invader: TTakeId) => (invaders.slice().filter(item => {
        if (item.id === invader.take_id)
            return false;
        return true;
    })))

$invadersStore.watch(() => console.log('$invadersStore'))

const useInvader = () => {
    return {
        takes: useStore($invadersStore)
    }
}

export const selectors = {
    useInvader,
}