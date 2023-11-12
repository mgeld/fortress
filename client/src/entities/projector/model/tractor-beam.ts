import { TFindContType } from "@ctypes/model"
import { createStore } from "effector"
import { useStore } from "effector-react"
import { projectorAPI } from "shared/api/events"
import { TBootyId } from "shared/api/events/projector"
import { TLatLng } from "shared/types"

export type TBeam = {
    // id: number,
    from_pos: TLatLng
    to_pos: TLatLng
}

const DEFAULT_STORE: TBeam | null = null

const {
    setBeam,
} = projectorAPI.events

const $beamStore = createStore<TBeam | null>(DEFAULT_STORE)
    .on(setBeam, (_, beam: TBeam | null) => beam)

const useBeam = () => {
    return {
        beam: useStore($beamStore)
    }
}


export type TBooty = {
    id: number
    cont: TFindContType
    from_pos: TLatLng
    to_pos: TLatLng
}

const DEFAULT_STORE_BOOTY: TBooty[] = []

const {
    addBooty,
    delBootyById,
} = projectorAPI.events

const $bootyStore = createStore<TBooty[]>(DEFAULT_STORE_BOOTY)
    .on(addBooty, (booty_s: TBooty[], booty: TBooty) => ([...booty_s, booty]))
    .on(delBootyById, (booty_s: TBooty[], booty: TBootyId) => (booty_s.slice().filter(item => {
        if (item.id === booty.booty_id)
            return false;
        return true;
    })))

$bootyStore.watch(() => console.log('$bootyStore'))

const useBooty = () => {
    return {
        items: useStore($bootyStore)
    }
}

export const selectors = {
    useBeam,
    useBooty,
}