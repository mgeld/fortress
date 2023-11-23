import { createEvent, createStore } from "effector"
import { useStore } from "effector-react"

const useLockScreen = () => useStore($lockScreenStore)

type TAlert = {
    alert: string
    message: string
    action: {
        text: string
        _click: () => void
    }
}

const setLockScreen = createEvent<TAlert>()
export const $lockScreenStore = createStore<TAlert | null>(null)
    .on(setLockScreen, (_, alert) => alert)

export const selectors = {
    useLockScreen,
}

export const events = {
    setLockScreen
}