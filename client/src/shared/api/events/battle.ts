import { createEvent } from "effector";
// import { TPointer } from "entities/pointer/model/pointer-map";
// import { TLatLng } from "shared/types";

// const setPointers = createEvent<TPointer[]>()
// const newPointer = createEvent<TPointer>()

// export type TUpdatePos = {
//     pos: TLatLng
//     userId: number
// }
// const updatePositionPointer = createEvent<TUpdatePos>()

// export type THealthPointer = {
//     userId: number
//     health: number
// }
// const changeHealthPointer = createEvent<THealthPointer>()


export type TBattleStatus = 'default' | 'pending' | 'start' | 'over'
const setBattleStatus = createEvent<TBattleStatus>()

export const events = {
    setBattleStatus,
    // newPointer,
    // setPointers,
    // updatePositionPointer,
    // changeHealthPointer
}