import { FC } from "react"
import Drone from "./drone"

import { TLatLng } from "@ctypes/model"
import DroneIOS from "./drone-ios"
import { getPlatformNative } from "shared/lib/get-platform-native"

let platform = getPlatformNative()

export type TDroneProps = {
    health: number
    pos: TLatLng
    size: number
}

export const Ship: FC<TDroneProps> = ({ size, health, pos }) => {
    if (platform === 'iphone')
        return <DroneIOS
            health={health}
            pos={pos}
            // size={size}
        />
    return <Drone
        health={health}
        pos={pos}
        size={size}
    />

}