import { reducer } from "../lib/reducer";
import { useStore } from "effector-react";
import { shipAPI } from "shared/api/events";

import { getUserAPI } from "shared/api/get-user";
import { TJoystickDirection, TLatLng } from "shared/types";
import { createEffect, createEvent, createStore, sample } from "effector";

import { Areal } from "entities/areal/model";

export type TActionPos = {
    type: TJoystickDirection | null,
}

const {
    setPos,
    initPos,
    setLevel,
    addHealth,
    setHealth,
    changeHealth,
} = shipAPI.events

const DEFAULT_STORE_POSITION: TLatLng = [0, 0]

const resetUser = createEvent()

const movePoint = createEvent<TActionPos>()

export const $userPositionStore = createStore<TLatLng>(DEFAULT_STORE_POSITION)
    .on(movePoint, reducer)
    .on(initPos, (_, pos) => pos)
    .on(setPos, (_, pos) => pos)

export const $shipLevel = createStore<number>(0)
    .on(setLevel, (_, areal) => areal)

type TPosAreal = {
    areal: [TLatLng, TLatLng] | null
    pos: TLatLng
}

const setAreal = createEvent<[TLatLng, TLatLng] | null>()
export const $arealStore = createStore<[TLatLng, TLatLng] | null>(null)
    // .on(setAreal, (_, areal) => areal)
    
export const $prevArealStore = createStore<[TLatLng, TLatLng] | null>(null)

sample({
    clock: movePoint,
    source: {
        areal: $arealStore,
        pos: $userPositionStore
    },
    filter: (source: TPosAreal): source is TPosAreal => !!source.pos[0] && (source.areal?.toString() !== Areal.getBounds(source.pos).toString()),
    fn: (source, _) => Areal.getBounds(source.pos),
    target: setAreal
})

sample({
    clock: setAreal,
    source: $arealStore,
    target: $prevArealStore
})

sample({
    clock: setAreal,
    target: $arealStore
})

const DEFAULT_STORE_HEALTH: number = 0
export const $userHealthStore = createStore(DEFAULT_STORE_HEALTH)
    .on(setHealth, (_, health) => health)
    .on(changeHealth, (health, damage) => health - damage)
    .on(addHealth, (health, h) => health + h)


const getUserFx = createEffect(() => {
    getUserAPI()
    return 0
})
sample({
    clock: resetUser,
    target: getUserFx
})

export const events = {
    movePoint,
    resetUser,
    setAreal
}

const useShip = () => {
    return {
        pos: useStore($userPositionStore),
        health: useStore($userHealthStore),
    }
}

const useAreal = () => useStore($arealStore)
const useShipLevel = () => useStore($shipLevel)
const useShipPos = () => useStore($userPositionStore)
const useShipHealth = () => useStore($userHealthStore)

export const selectors = {
    useShip,
    useShipLevel,
    useShipPos,
    useShipHealth,
    useAreal
}