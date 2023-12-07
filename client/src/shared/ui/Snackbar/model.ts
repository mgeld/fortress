import { createEffect, createEvent, createStore, sample } from "effector"
import { useStore } from "effector-react"

const useSnackbar = () => {
    return {
        data: useStore($snackbarStore)
    }
}

type TToast = {
    id: number
    type: number
    count: number
    text: string
}

type TTypeToast =
    | 1 // 'take-sector'
    | 2 // 'add-sector-invader'
    | 3 // 'killed-fort-defenders'
    | 4 // 'killed-invader'
    | 5 // 'you-zone-fit'
    | 6 // 'mine-explosion'
    | 7 // 'container-found
    | 8 // 'container-not-found
    | 9 // 'not-invaders
    | 10 // 'your-sector-take'
    | 11 // 'return-invader'

type TTostProps = {
    text: string
    t: TTypeToast
}
const newToast = createEvent<TTostProps>()

const addToast = createEvent<TToast>()
const setToast = createEvent<Omit<TToast, 'count'>>()
const delToastById = createEvent<{ toast_id: number }>()

export const $snackbarStore = createStore<TToast[]>([])
    .on(addToast, (toasts, toast) => [toast, ...(toasts.splice(0, 4))])
    .on(setToast, (toasts, toast) => toasts.map(item => {
        return item.type === toast.type ? {
            ...item,
            count: item.count + 1
        } : item
    }))
    .on(addToast, (toasts, toast) => [toast, ...(toasts.splice(0, 4))])
    .on(delToastById, (toasts, toast) => (toasts.filter(item => {
        if (item.id === toast.toast_id)
            return false;
        return true;
    })))

const newToastFx = createEffect(({
    toast,
    toasts
}: {
    toast: TTostProps
    toasts: TToast[]
}) => {
    const TOAST_ID: number = Date.now()

    if(~toasts.findIndex(item => item.type === toast.t)) {
        setToast({
            id: TOAST_ID,
            type: toast.t,
            text: toast.text
        })
    } else {
        addToast({
            id: TOAST_ID,
            count: 1,
            type: toast.t,
            text: toast.text
        })
    }

    setTimeout(() => {
        delToastById({ toast_id: TOAST_ID })
    }, 4000)

})

sample({
    clock: newToast,
    source: $snackbarStore,
    fn: (source, clock) => ({toast: clock, toasts: source}),
    target: newToastFx
})

export const selectors = {
    useSnackbar,
}

export const events = {
    newToast
}