import { TPointer } from "entities/pointer/model/pointer-map"
import { THitPointer } from "features/control-fire/model"
import { TJoystickDirection, TLatLng } from "shared/types"

export type TEventConnectPointer = 'connect-pointer'
export type TEventDirectPointer = 'direct-pointer'
export type TEventPointers = 'pointers'
export type TEventFire = 'fire'

export type TEventsMessage =
    | TEventFire
    | TEventPointers
    | TEventDirectPointer
    | TEventConnectPointer


type TConnectPointerPayload = {
    userId: number
    pos: TLatLng
    health: number
}
export type TConnectPointer = {
    event: TEventConnectPointer
    payload: TConnectPointerPayload
}


type TDirectPointerPayload = {
    userId: number
    pos: TLatLng
}
export type TDirectPointer = {
    event: TEventDirectPointer
    payload: TDirectPointerPayload
}


type TPointersPayload = {
    pointers: TPointer[]
}
export type TPointers = {
    event: TEventPointers
    payload: TPointersPayload
}


type TFirePayload = {
    position: TLatLng
    direction: TJoystickDirection
    userId: number
    hitPointer?: THitPointer
}
export type TFire = {
    event: TEventFire
    payload: TFirePayload
}

export type TMessage =
    | TConnectPointer
    | TDirectPointer
    | TPointers
    | TFire