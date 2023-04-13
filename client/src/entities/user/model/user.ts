import { createEvent, createStore } from "effector";
import { useStore } from "effector-react";
import { TJoystickDirection, TLatLng } from "shared/types";
import { reducer } from "../lib/reducer";

export type TUser = {
    userId: number
    health: number
    pos: number
}

export type TActionPos = {
    type: TJoystickDirection | null,
}

const DEFAULT_STORE_POSITION: TLatLng = [43.31, 45.68];

const movePoint = createEvent<TActionPos>()
const setHealth = createEvent<number>()
const setUser = createEvent<number>()

movePoint.watch(() => console.log('movePoint'))

export const $userPositionStore = createStore<TLatLng>(DEFAULT_STORE_POSITION)
    .on(movePoint, reducer)

const DEFAULT_STORE_HEALTH: number = 0
export const $userHealthStore = createStore(DEFAULT_STORE_HEALTH).
    on(setHealth, (_, health) => health)

const DEFAULT_STORE_USER: number = 0
export const $userIdStore = createStore(DEFAULT_STORE_USER)
    .on(setUser, (_, state) => state)

export const events = {
    movePoint,
    setHealth,
    setUser
}

export const useUser = () => {
    return {
        userId: useStore($userIdStore),
        pos: useStore($userPositionStore),
        health: useStore($userHealthStore),
    }
}

export const useUserId = () => useStore($userIdStore)