import { createEffect, createEvent, createStore, sample } from "effector"
import { useStore } from "effector-react"

const usePage = () => {
    return {
        data: useStore($pageStore)
    }
}

export type TPage =
    | 'map'
    | 'map-satellite'
    | 'extraction'
    | 'gun-shop'
    | 'rating'
    | 'zone'
    | 'abduction'

const setPage = createEvent<TPage>()
const returnPage = createEvent<TPage>()
const addPage = createEvent<TPage>()
const delHistoryPage = createEvent()

export const $historyStore = createStore<TPage[]>(['map'])
    .on(addPage, (pages, page) => ([page, ...pages]))
    .on(delHistoryPage, (pages, _) => {
        pages.shift()
        return pages
    })

export const $pageStore = createStore<TPage>('map')
    .on(returnPage, (_, page) => page)

const pageFx = createEffect((page: TPage) => {
    if (page) {
        addPage(page)
        window.history.pushState({ page }, page)
    }
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
    setPage,
    returnPage,
    delHistoryPage
}


// ---------------------
