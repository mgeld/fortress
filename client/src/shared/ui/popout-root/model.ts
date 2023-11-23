import { createEffect, createEvent, createStore, sample } from "effector"
import { useStore } from "effector-react"

const usePopout = () => {
    return {
        data: useStore($popoutStore)
    }
}

export type TPopout =
    | 'battle-pending'
    | 'battle-over'
    | 'user-dead'
    | 'select-place'
    | 'select-extraction'
    | 'select-unit'
    | 'ship'
    | 'storm-corps'
    | 'gun'
    | 'hold'

    | 'gun-improve-distance'
    | 'gun-improve-power'
    | 'storm-add-invaders'
    | 'storm-improve-power'
    | 'ship-improve-health'

    | 'ship-level-up'
    | 'gun-level-up'
    | 'storm-level-up'
    | 'hold-level-up'
    | 'alert'
    | 'lock-screen'
    // | 'unit-out-hold'
    | 'panel'
    | 'primes'
// | 'use-item'

const setPopout = createEvent<TPopout | null>()

export const $popoutStore = createStore<TPopout | null>(null)
    .on(setPopout, (_, modal) => modal)

export const selectors = {
    usePopout,
}

const popoutFx = createEffect((popout: TPopout | null) => {
    if (popout) window.history.pushState({ popout }, popout)
    return popout
})

sample({
    clock: setPopout,
    target: popoutFx
})

sample({
    clock: popoutFx.doneData,
    target: $popoutStore
})

export const events = {
    setPopout
}