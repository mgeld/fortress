import { createEffect, createEvent, createStore, sample } from "effector"
import { useStore } from "effector-react"

const usePage = () => {
    return {
        data: useStore($pageStore)
    }
}

export type TPage =
    | 'map'
    | 'extraction'
    | 'gun-shop'
    | 'rating'

const setPage = createEvent<TPage>()

export const $pageStore = createStore<TPage>('map')
// .on(setPage, (_, page) => page)

const pageFx = createEffect((page: TPage) => {
    if (page) window.history.pushState({ page }, page)
    return page
})

sample({
    clock: setPage,
    target: pageFx
})

sample({
    clock: pageFx.doneData,
    target: $pageStore
})

export const selectors = {
    usePage,
}

export const events = {
    setPage
}


// ---------------------
