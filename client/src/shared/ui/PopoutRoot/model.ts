import { createEvent, createStore } from "effector"
import { useStore } from "effector-react"

const usePopout = () => {
    return {
        data: useStore($popoutStore)
    }
}

type TPopout =
    | 'battle-pending'
    | 'battle-over'
    | 'user-dead'
    | 'select-place'
    
const setPopout = createEvent<TPopout | null>()

export const $popoutStore = createStore<TPopout | null>(null)
    .on(setPopout, (_, modal) => modal)

export const selectors = {
    usePopout,
}

export const events = {
    setPopout
}