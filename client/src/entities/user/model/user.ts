import { createEvent, createStore } from "effector";
import { useStore } from "effector-react";
import { userAPI } from "shared/api/events";

const {
    setUser,
    setRankLevel,
    setRankExp,
    addRankExp,
    setName,
    setUserIcon
    // rankUpLevel
} = userAPI.events


const setVkUser = createEvent<number>()

export const $rankLevelStore = createStore<number>(0)
    .on(setRankLevel, (_, rank) => rank)
    // .on(rankUpLevel, (rank, _) => rank + 1)

export const $rankExpStore = createStore<number>(0)
    .on(setRankExp, (_, exp) => exp)
    .on(addRankExp, (exp, e) => exp + e)

export const $userNameStore = createStore<string>('')
    .on(setName, (_, name) => name)

export const $userIconStore = createStore<string>('')
    .on(setUserIcon, (_, icon) => icon)

const DEFAULT_STORE_USER: number = 0
export const $userIdStore = createStore(DEFAULT_STORE_USER)
    .on(setUser, (_, state) => state)

const DEFAULT_STORE_VK_USER: number = 0
export const $userVkIdStore = createStore(DEFAULT_STORE_VK_USER)
    .on(setVkUser, (_, state) => state)

export const events = {
    setVkUser
}

const useUser = () => {
    return {
        userId: useStore($userIdStore),
        vkUserId: useStore($userIdStore),
        userName: useStore($userNameStore),
        userIcon: useStore($userIconStore),
    }
}

const useVkUserId = () => useStore($userVkIdStore)
const useUserId = () => useStore($userIdStore)

const useRankLevel = () => useStore($rankLevelStore)
const useRankExp = () => useStore($rankExpStore)

export const selectors = {
    useUser,
    useUserId,
    useVkUserId,

    useRankLevel,
    useRankExp,
}