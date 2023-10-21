import { createStore, createEvent, sample, createEffect } from 'effector'
import { useStore } from 'effector-react'
import { pointersAPI } from "shared/api/events"
import { TDelPointer, THealthPointer, TUpdatePos } from "shared/api/events/pointers"
import { TLatLng } from 'shared/types'

import bridge from "@vkontakte/vk-bridge";
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
    changeHealthPointer
} = pointersAPI.events

type TUserApi = {
    id: number
    photo_50: string
    photo_100: string
    first_name: string
}

const getUsersFx = createEffect(async ({
    pointers,
    prevPointers
}: {
    pointers: TPointer[],
    prevPointers: TPointer[]
}): Promise<TPointer[]> => {

    const user_ids: number[] = pointers.map(item => item.userId)

    console.log('________user_ids', user_ids)
    console.log('________pointers', pointers)

    return bridge.send('VKWebAppCallAPIMethod', {
        method: 'users.get',
        params: {
            user_ids: user_ids.join(','),
            v: '5.131',
            fields: 'photo_50',
            access_token: '10811a2f10811a2f10811a2fdf1395cae51108110811a2f7425604c5854e1fbf0d0110c'
        }
    })
        .then((data: { response: TUserApi[] }) => {

            // if (!prevPointers) prevPointers = []

            if (data && pointers.length > 0) {
                return [
                    ...prevPointers,
                    ...pointers.map(pointer => {
                        const user = data.response.find(user => user.id === pointer.userId)
                        return {
                            ...pointer,
                            icon: user?.photo_50,
                            userName: user?.first_name
                        }
                    })
                ]
            } else {
                return []
            }
        })
        .catch((error) => {
            // Ошибка
            console.log(error);
            return []
        });
})

// getUsersFx.watch(values => console.log('IIIIIIIIIIIII getUsersFx', values))

// sample({
//     clock: setPointers,
//     fn: (clock) => ({
//         pointers: clock,
//         prevPointers: []
//     }),
//     target: getUsersFx
// })

export const $pointersStore = createStore<TPointer[]>(DEFAULT_STORE)
    .on(setPointers, (_, pointers: TPointer[]) => {
        // console.log('IIIIIIIIIIIII getUsersFx.doneData', pointers)
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
    .on(changeHealthPointer, (prevPointers: TPointer[], data: THealthPointer) => (prevPointers.map(prevPointer =>
        prevPointer.userId === data.userId ? {
            ...prevPointer,
            health: prevPointer.health - data.health
        } : prevPointer)
    ))
    .on(clearStore, () => ({
        ...DEFAULT_STORE
    }))

getUsersFx.doneData.watch(val => console.log('getUsersFx.doneData watch', val))

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
    getUsersFx
}