import { createEvent, createStore } from "effector"
import { useStore } from "effector-react"

const useAlert = () => useStore($alertStore)

type TAlert = {
    alert: string
    message: string
    action: {
        text: string
        _click: () => void
    }
}

const setAlert = createEvent<TAlert>()
export const $alertStore = createStore<TAlert | null>(null)
    .on(setAlert, (_, alert) => alert)


export const selectors = {
    useAlert,
}

export const events = {
    setAlert
}