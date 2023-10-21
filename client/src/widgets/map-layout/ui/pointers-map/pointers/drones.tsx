import { FC } from "react"
import { pointerMapModel } from "entities/pointer"
import { PointerDrone } from "./pointer-drone"

type DronesProps = {
    size: number
}

export const Drones: FC<DronesProps> = ({ size }) => {

    const pointers = pointerMapModel.selectors.usePointers().data

    return <>
        {pointers.map(pointer => {

            if(pointer.health < 1) return null

            return (
                <PointerDrone
                    key={pointer.userId}
                    health={pointer.health}
                    pos={pointer.pos}
                    size={size}
                />
            )
        })}
    </>
}