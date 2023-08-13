import { FC } from "react"
import { pointerMapModel } from "entities/pointer"
import Drone from "entities/pointer/ui/drone"

type DronesProps = {
    size: number
}
export const Drones: FC<DronesProps> = ({ size }) => {

    const pointers = pointerMapModel.selectors.usePointers().data

    console.log('14 Drones')

    return <>
        {pointers.map(pointer => (
            <Drone
                key={pointer.userId}
                health={pointer.health}
                pos={pointer.pos}
                size={size}
            />
        ))}
    </>
}