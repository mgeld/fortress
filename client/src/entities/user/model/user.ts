import { createEffect, createEvent, createStore, sample } from "effector";
import { useStore } from "effector-react";
import { userAPI } from "shared/api/events";
import { TJoystickDirection, TLatLng } from "shared/types";
import { reducer } from "../lib/reducer";
import { Areal } from "entities/areal/model";
import { getUserAPI } from "shared/api/get-user";

export type TUser = {
    userId: number
    health: number
    pos: number
}

export type TActionPos = {
    type: TJoystickDirection | null,
}

const {
    setPos,
    setHealth,
    changeHealth
} = userAPI.events

// const DEFAULT_STORE_POSITION: TLatLng = [43.31, 45.68];
const DEFAULT_STORE_POSITION: TLatLng = [0, 0]

const movePoint = createEvent<TActionPos>()
const setUser = createEvent<number>()
const setName = createEvent<string>()
const setUserIcon = createEvent<string>()

const resetUser = createEvent()

const getUserFx = createEffect((userId: number) => {
    console.log('444444444444444 getUserFx')
    getUserAPI(userId)
    return 0
})

export const $userPositionStore = createStore<TLatLng>(DEFAULT_STORE_POSITION)
    .on(movePoint, reducer)
    .on(setPos, (_, pos) => pos)

const $arealStore = createStore<[TLatLng, TLatLng] | null>(null)

sample({
    clock: $userPositionStore,
    source: $arealStore,
    filter: (areal, pos): pos is TLatLng => !!pos[0] && (areal?.toString() !== Areal.getBounds(pos).toString()),
    fn: (_, pos) => Areal.getBounds(pos),
    target: $arealStore
})

$arealStore.watch(areal => console.log('>>>>>>>>>>>>//////////////// arealStore watch', areal))
$userPositionStore.watch(pos => console.log('>>>>>>>>>>>>//////////////// userPositionStore watch', pos))

export const $userNameStore = createStore<string>('')
    .on(setName, (_, name) => name)

export const $userIconStore = createStore<string>('')
    .on(setUserIcon, (_, icon) => icon)

const DEFAULT_STORE_HEALTH: number = 0
export const $userHealthStore = createStore(DEFAULT_STORE_HEALTH)
    .on(setHealth, (_, health) => health)
    .on(changeHealth, (health, damage) => health - damage)


const DEFAULT_STORE_USER: number = 0
export const $userIdStore = createStore(DEFAULT_STORE_USER)
    .on(setUser, (_, state) => state)



sample({
    clock: resetUser,
    source: $userIdStore,
    // filter: (userId): userId is number => userId !== null,
    target: getUserFx
})

export const events = {
    movePoint,
    setUser,
    setName,
    setUserIcon,
    resetUser
}

const useUser = () => {
    return {
        userId: useStore($userIdStore),
        userName: useStore($userNameStore),
        userIcon: useStore($userIconStore),
        pos: useStore($userPositionStore),
        health: useStore($userHealthStore),
    }
}

const useUserId = () => useStore($userIdStore)
const useUserPos = () => useStore($userPositionStore)
const useUserHealth = () => useStore($userHealthStore)

const useAreal = () => useStore($arealStore)

export const selectors = {
    useUser,
    useUserId,
    useUserPos,
    useUserHealth,

    useAreal
}