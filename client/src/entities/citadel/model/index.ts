import { TCitadel } from "@ctypes/socket/server-to-client"
import { createStore } from "effector"
import { useStore } from "effector-react"
import { citadelAPI } from "shared/api/events"

const {
    setCitadel,
} = citadelAPI.events

export const $citadelStore = createStore<TCitadel>(null)
    .on(setCitadel, (_, citadel) => citadel)

const useCitadel = () => useStore($citadelStore)

export const selectors = {
    useCitadel,
}