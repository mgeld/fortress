import { createEvent, createStore, sample } from "effector"
import { useStore } from "effector-react"

export type TSocketStatus = 'open' | 'close'

export const $socketStatus = createStore<TSocketStatus>('close')

const setSocketStatus = createEvent<TSocketStatus>()

sample({
    clock: setSocketStatus,
    target: $socketStatus
})

export const useSocket = () => useStore($socketStatus)

export const events = {
    setSocketStatus
}