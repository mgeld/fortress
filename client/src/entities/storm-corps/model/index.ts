import { createStore } from "effector"
import { useStore } from "effector-react"
import { stormAPI } from "shared/api/events"

const {
    setStormInvaders,
    setStormPower,
    setStormLevel,
    setStormCapacity,
    improveStormPower,
    addInvaders
} = stormAPI.events


export const $stormLevelStore = createStore<number>(0)
    .on(setStormLevel, (_, level) => level)

export const $stormInvadersStore = createStore<number>(0)
    .on(setStormInvaders, (_, invaders) => invaders)
    .on(addInvaders, (invaders, i) => invaders + i)

export const $stormPowerStore = createStore<number>(0)
    .on(setStormPower, (_, power) => power)
    .on(improveStormPower, (power, p) => power + p);

export const $capacityInvaders = createStore<number>(0)
    .on(setStormPower, (_, limit) => limit)

// export const 
const useStormInvaders = () => useStore($stormInvadersStore)
const useStormPower = () => useStore($stormPowerStore)
const useStormLevel = () => useStore($stormLevelStore)
// const useStormCapacity = () => useStore($capacityInvaders)

export const selectors = {
    useStormInvaders,
    useStormPower,
    useStormLevel,
    // useStormCapacity
}

