import { THitPointer } from "features/control-fire/model"
import { TJoystickDirection, TLatLng } from "shared/types"

export type TEventsAPI =
    | "connect"
    | "direct"
    | "pointers"
    | "fire"

export type TSendEvent = {
    event: TEventsAPI
    payload: any
}

export type TConnectUserAPI = {
    event: 'connect'
    payload: {
        position: TLatLng
        health: number
        userId: number
    }
}

export type TFireAPI = {
    event: 'fire'
    payload: {
        position: TLatLng
        direction: TJoystickDirection | null
        userId: number
        hitPointer?: THitPointer
    }
}

export type TDirectAPI = {
    event: 'direct'
    payload: {
        position: TLatLng
        userId: number
    }
}