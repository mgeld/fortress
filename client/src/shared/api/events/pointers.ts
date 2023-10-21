import { TPointer } from "@ctypes/model";
import { createEvent } from "effector";
// import { TPointer } from "entities/pointer/model/pointer-map";
import { TLatLng } from "shared/types";

const setPointers = createEvent<TPointer[]>()
const newPointer = createEvent<TPointer>()

export type TDelPointer = {
    userId: number
}
const delPointer = createEvent<TDelPointer>()

export type TUpdatePos = {
    pos: TLatLng
    userId: number
}
const updatePositionPointer = createEvent<TUpdatePos>()

export type THealthPointer = {
    userId: number
    health: number
}
const changeHealthPointer = createEvent<THealthPointer>()

export const events = {
    newPointer,
    delPointer,
    setPointers,
    updatePositionPointer,
    changeHealthPointer
}