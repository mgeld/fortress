import { createEvent, createStore } from "effector"
import { useStore } from "effector-react"

const usePage = () => {
    return {
        data: useStore($pageStore)
    }
}

type TPage =
    | 'map'
    | 'extraction'

const setPage = createEvent<TPage>()

export const $pageStore = createStore<TPage>('map')
    .on(setPage, (_, page) => page)

export const selectors = {
    usePage,
}

export const events = {
    setPage
}