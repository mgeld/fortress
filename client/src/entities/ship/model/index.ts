import { createEffect, createEvent, createStore, sample } from "effector";
import { useStore } from "effector-react";
import { shipAPI } from "shared/api/events";
import { TJoystickDirection, TLatLng } from "shared/types";
import { Areal } from "entities/areal/model";
import { getUserAPI } from "shared/api/get-user";
import { reducer } from "../lib/reducer";

export type TActionPos = {
    type: TJoystickDirection | null,
}

const DEFAULT_STORE_POSITION: TLatLng = [0, 0]

const resetUser = createEvent()

const setAreal = createEvent<[TLatLng, TLatLng] | null>()

const {
    setPos,
    setLevel,
    addHealth,
    setHealth,
    changeHealth,
} = shipAPI.events

const movePoint = createEvent<TActionPos>()

const getUserFx = createEffect(() => {
    getUserAPI()
    return 0
})

export const $userPositionStore = createStore<TLatLng>(DEFAULT_STORE_POSITION)
    .on(movePoint, reducer)
    .on(setPos, (_, pos) => pos)

export const $arealStore = createStore<[TLatLng, TLatLng] | null>(null)
    .on(setAreal, (_, areal) => areal)

export const $shipLevel = createStore<number>(0)
    .on(setLevel, (_, areal) => areal)

type TPosAreal = {
    areal: [TLatLng, TLatLng] | null
    pos: TLatLng
}

sample({
    clock: movePoint,
    source: {
        areal: $arealStore,
        pos: $userPositionStore
    },
    filter: (source: TPosAreal): source is TPosAreal => !!source.pos[0] && (source.areal?.toString() !== Areal.getBounds(source.pos).toString()),
    fn: (source, _) => Areal.getBounds(source.pos),
    target: $arealStore
})

const DEFAULT_STORE_HEALTH: number = 0
export const $userHealthStore = createStore(DEFAULT_STORE_HEALTH)
    .on(setHealth, (_, health) => health)
    .on(changeHealth, (health, damage) => health - damage)
    .on(addHealth, (health, h) => health + h)

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

const useShipPos = () => useStore($userPositionStore)
const useShipHealth = () => useStore($userHealthStore)
const useShipLevel = () => useStore($shipLevel)

const useAreal = () => useStore($arealStore)

export const selectors = {
    useShip,
    useShipLevel,
    useShipPos,
    useShipHealth,
    useAreal
}