import { createStore, createEvent } from 'effector'
import { useStore } from 'effector-react'
import { pointersAPI } from "shared/api/events"
import { TDelPointer, THealthPointer, TUpdatePos } from "shared/api/events/pointers"

import { TPointer } from '@ctypes/model'

// export type TPointer = {
//     userId: number
//     health: number,
//     name?: string
//     icon?: string,
//     pos: TLatLng
// }

const DEFAULT_STORE: TPointer[] = []

const usePointers = () => {
    return {
        data: useStore($pointersStore)
    }
}

const clearStore = createEvent()

const {
    setPointers,
    newPointer,
    delPointer,
    updatePositionPointer,
    changeHealthPointer,
    setHealthPointer
} = pointersAPI.events

export const $pointersStore = createStore<TPointer[]>(DEFAULT_STORE)
    .on(setPointers, (_, pointers: TPointer[]) => {
        return pointers
    })
    .on(newPointer, (prevPointers: TPointer[], pointer: TPointer) => ([...prevPointers, pointer]))
    .on(delPointer, (prevPointers: TPointer[], data: TDelPointer) => prevPointers.filter(pointer => pointer.userId !== data.userId))
    .on(updatePositionPointer, (prevPointers: TPointer[], data: TUpdatePos) => (prevPointers.map(pointer => {
        if (pointer.userId === data.userId)
            return {
                ...pointer,
                pos: data.pos
            }
        return pointer
    })))
    .on(changeHealthPointer, (prevPointers: TPointer[], data: THealthPointer) => (prevPointers.map(prevPointer => {
        const nHealth = prevPointer.health - data.health
        return prevPointer.userId === data.userId ? {
            ...prevPointer,
            health: nHealth < 0 ? 0 : nHealth

        } : prevPointer
    })
    ))
    .on(setHealthPointer, (prevPointers: TPointer[], data: THealthPointer) => (prevPointers.map(prevPointer =>
        prevPointer.userId === data.userId ? {
            ...prevPointer,
            health: data.health
        } : prevPointer)
    ))
    .on(clearStore, () => DEFAULT_STORE)

// sample({
//     clock: newPointer,
//     source: $pointersStore,
//     fn: (source, clock) => ({
//         pointers: [clock],
//         prevPointers: source
//     }),
//     target: getUsersFx
// })

// $pointerStore = $pointersStore.map(getById,

//     sample({
//         clock: getById,
//         source: $pointersStore,
//         fn: (pointers, pointerId) => pointers.find(pointer => pointer.userId === pointerId)),
//     target: 
//    })

export const selectors = {
    usePointers,
}

export const events = {
    clearStore
}

export const effects = {
    // getUsersFx
}