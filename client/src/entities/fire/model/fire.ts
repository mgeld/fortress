import { createStore } from "effector"
import { useStore } from "effector-react"
import { firesAPI } from "shared/api/events"
import { TFireId } from "shared/api/events/fires"
import { TLatLng } from "shared/types"

export type TFire = {
    id: number,
    from_pos: TLatLng
    to_pos: TLatLng
    hit_pos?: TLatLng | null // Если в кого-то попало
    direction: number | null
}

const DEFAULT_STORE: TFire[] = []

const {
    setFires,
    addFire,
    delFireById,
    // addFireHitMarket,
} = firesAPI.events

const $firesStore = createStore<TFire[]>(DEFAULT_STORE)
    .on(setFires, (_, fires: TFire[]) => fires)
    .on(addFire, (fires: TFire[], fire: TFire) => ([...fires, fire]))
    .on(delFireById, (fires: TFire[], fire: TFireId) => (fires.slice().filter(item => {
        if (item.id === fire.fire_id)
            return false;
        return true;
    })))

export const useFire = () => {
    return {
        fires: useStore($firesStore)
    }
}

export const selectors = {
    useFire,
}