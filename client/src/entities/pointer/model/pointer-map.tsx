import { createStore, createEvent, sample } from 'effector'
import { useStore } from 'effector-react'
import { pointersAPI } from "shared/api/events"
import { THealthPointer, TUpdatePos } from "shared/api/events/pointers"
import { TJoystickDirection, TLatLng } from 'shared/types'

export type TPointer = {
    userId: number
    health: number,
    icon?: string,
    pos: TLatLng
}

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
    updatePositionPointer,
    changeHealthPointer
} = pointersAPI.events

export const $pointersStore = createStore<TPointer[]>(DEFAULT_STORE)
    .on(setPointers, (_, pointers: TPointer[]) => pointers)
    .on(newPointer, (prevPointers: TPointer[], pointer: TPointer) => ([...prevPointers, pointer]))
    .on(updatePositionPointer, (prevPointers: TPointer[], data: TUpdatePos) => (prevPointers.map(pointer => {
        if (pointer.userId === data.userId)
            return {
                ...pointer,
                pos: data.pos
            }
        return pointer
    })))
    .on(changeHealthPointer, (prevPointers: TPointer[], data: THealthPointer) => (prevPointers.map(prevPointer =>
        prevPointer.userId === data.userId ? {
            ...prevPointer,
            health: prevPointer.health - data.health
        } : prevPointer)
    ))
    .on(clearStore, () => ({
        ...DEFAULT_STORE
    }))

// const getHitPointer = createEvent<THitPointer>()

// $hitPointer = 

// sample({
//     clock: getHitPointer,
//     source: $pointersStore,
//     fn: () =>


// })
export const selectors = {
    usePointers,
}

export const events = {
    clearStore
}