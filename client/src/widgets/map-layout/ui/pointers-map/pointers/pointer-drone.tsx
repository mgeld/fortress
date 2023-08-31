import Drone from "entities/pointer/ui/drone"
import { FC } from "react"
import { TLatLng } from "shared/types"

type TDroneProps = {
    pos: TLatLng
    health: number
    size: number
}
export const PointerDrone: FC<TDroneProps> = ({ size, health, pos }) => {
    if (health < 1) return <></>
    return (
        <Drone
            health={health}
            pos={pos}
            size={size}
        />
    )
}