import { createEvent, createStore } from "effector"
import { useStore } from "effector-react"

const useTutorial = () => useStore($tutorialStore)

export type TCard =
    | 'ship'
    | 'storm'
    | 'projector'
    | 'gun'

const setTutorial = createEvent<TCard | null>()

export const $tutorialStore = createStore<TCard | null>(null)
    .on(setTutorial, (_, tut) => tut)


export const selectors = {
    useTutorial,
}

export const events = {
    setTutorial
}