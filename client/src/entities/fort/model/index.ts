import { TLatLng } from "@ctypes/model";
import { TFindContPayload, TTakeHitPayload } from "@ctypes/socket/server-to-client";
import { createEvent, createStore } from "effector";
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

const setFort = createEvent<TLatLng | null>()

const $fortStore = createStore<TLatLng | null>(null)
    .on(setFort, (_, payload) => payload)

const useFort = () => {
    return {
        data: useStore($fortStore)
    }
}


export const selectors = {
    useTakeFort,
    useContainerFort,
    useFort
}

export const events = {
    setFort
}
