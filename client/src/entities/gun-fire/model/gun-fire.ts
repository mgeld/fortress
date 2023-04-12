import { createStore } from "effector"
import { useStore } from "effector-react"
import { firesAPI } from "shared/api/events"
import { TFireId } from "shared/api/events/fires"
import { TJoystickDirection, TLatLng } from "shared/types"

export type TGunFire = {
    id: number,
    from_pos: TLatLng
    to_pos: TLatLng
    hit_pos?: TLatLng | null // Если в кого-то попало
    direction: TJoystickDirection | null,
}

const DEFAULT_STORE: TGunFire[] = []

const {
    setFires,
    addFire,
    // addFireHitMarket,
    delFireById
} = firesAPI.events

const $firesStore = createStore<TGunFire[]>(DEFAULT_STORE)
    .on(setFires, (_, fires: TGunFire[]) => fires)
    .on(addFire, (fires: TGunFire[], fire: TGunFire) => ([...fires, fire]))
    .on(delFireById, (fires: TGunFire[], fire: TFireId) => (fires.slice().filter(item => {
        if (item.id === fire.fire_id)
            return false;
        return true;
    })))

$firesStore.watch(data => console.log('$firesStore', data))
setFires.watch(() => console.log('setFires'))
addFire.watch(() => console.log('addFire'))
delFireById.watch(() => console.log('delFireById'))

export const useGunFire = () => {
    return {
        fires: useStore($firesStore)
    }
}

export const selectors = {
    useGunFire,
}