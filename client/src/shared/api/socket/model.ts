import { createEvent, createStore, sample } from "effector"
import { useStore } from "effector-react"

export type TSocketStatus = 'open' | 'close' | 'no-init'

export const $socketStatus = createStore<TSocketStatus>('no-init')

const setSocketStatus = createEvent<TSocketStatus>()

sample({
    clock: setSocketStatus,
    target: $socketStatus
})


export const useSocket = () => useStore($socketStatus)


const reSocket = createEvent()

export const events = {
    setSocketStatus,
    reSocket
}
