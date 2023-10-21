import { TFindContPayload, TTakeHitPayload } from "@ctypes/socket/server-to-client";
import { createStore } from "effector";
import { useStore } from "effector-react";
import { projectorAPI, sectorsAPI } from "shared/api/events";

const {
    setTakeFort
} = sectorsAPI.events

const {
    setContainer
} = projectorAPI.events

const $takeFortStore = createStore<TTakeHitPayload | null>(null)
    .on(setTakeFort, (_, payload) => payload)

const $containerFortStore = createStore<TFindContPayload | null>(null)
    .on(setContainer, (_, payload) => payload)

const useTakeFort = () => {
    return {
        data: useStore($takeFortStore)
    }
}

const useContainerFort = () => {
    return {
        data: useStore($containerFortStore)
    }
}

export const selectors = {
    useTakeFort,
    useContainerFort
}
