import { TTakeHitPayload } from "@ctypes/socket/server-to-client";
import { createStore } from "effector";
import { useStore } from "effector-react";
import { sectorsAPI } from "shared/api/events";

const {
    setTakeFort
} = sectorsAPI.events

const $takeFortStore = createStore<TTakeHitPayload | null>(null)
    .on(setTakeFort, (_, payload) => payload)

const useTakeFort = () => {
    return {
        data: useStore($takeFortStore)
    }
}

export const selectors = {
    useTakeFort,
}
