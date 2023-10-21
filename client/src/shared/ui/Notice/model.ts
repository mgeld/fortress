import { TTypeToastNotice } from "@ctypes/model"
import { createEffect, createEvent, createStore, sample } from "effector"
import { useStore } from "effector-react"

const useNotice = () => {
    return {
        data: useStore($noticeStore)
    }
}

type TToast = {
    id: number
    type: TTypeToastNotice
    name: string
    // count: number
    text: string
}

type TTostProps = {
    name: string
    text: string
    t: TTypeToastNotice
}
const newToast = createEvent<TTostProps>()

const addToast = createEvent<TToast>()
// const setToast = createEvent<Omit<TToast, 'count'>>()
const delToastById = createEvent<{ toast_id: number }>()

export const $noticeStore = createStore<TToast[]>([])
    .on(addToast, (toasts, toast) => [toast, ...(toasts.splice(0, 2))])
    // .on(setToast, (toasts, toast) => toasts.map(item => {
    //     return item.type === toast.type ? {
    //         ...item,
    //         count: item.count + 1
    //     } : item
    // }))
    .on(addToast, (toasts, toast) => [toast, ...(toasts.splice(0, 2))])
    .on(delToastById, (toasts, toast) => (toasts.filter(item => {
        if (item.id === toast.toast_id)
            return false;
        return true;
    })))

const newToastFx = createEffect(({
    toast,
    // toasts
}: {
    toast: TTostProps
    // toasts: TToast[]
}) => {
    const TOAST_ID: number = Date.now()

    // if(~toasts.findIndex(item => item.type === toast.t)) {
    //     setToast({
    //         id: TOAST_ID,
    //         type: toast.t,
    //         text: toast.text
    //     })
    // } else {
    addToast({
        id: TOAST_ID,
        // count: 1,
        name: toast.name,
        text: toast.text,
        type: toast.t,
    })
    // }

    setTimeout(() => {
        delToastById({ toast_id: TOAST_ID })
    }, 4000)

})

sample({
    clock: newToast,
    // source: $noticeStore,
    fn: (clock) => ({ toast: clock }),
    target: newToastFx
})

export const selectors = {
    useNotice,
}

export const events = {
    newToast
}