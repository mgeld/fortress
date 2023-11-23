import { createEvent, createStore, sample } from "effector"
import { useStore } from "effector-react"
import { TTutType } from "@ctypes/model"

const useTutorial = () => useStore($tutorialStore)

const setTutorial = createEvent<TTutType | null>()

export const $tutorialStore = createStore<TTutType | null>(null)
    .on(setTutorial, (_, tut) => tut)


export const selectors = {
    useTutorial,
}

export const events = {
    setTutorial
}