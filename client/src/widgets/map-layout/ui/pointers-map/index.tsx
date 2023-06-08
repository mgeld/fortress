import { FC } from "react"
import Point from "entities/pointer/ui/point"
import { pointerMapModel } from "entities/pointer"
import { usePointer } from "entities/pointer/hooks/use-pointer"

// import { filterPointersStore } from "widgets/map-layout/model"

// filterPointersStore()

export const PointersMap: FC = () => {

    const { point } = usePointer()

    const pointers = pointerMapModel.selectors.usePointers().data

    if (!point.load) return <>Load...</>

    return <>
        {pointers.map(pointer => (
            <Point
                key={pointer.userId}
                pointer={pointer}
                icon={point.icon}
            />
        ))}
    </>
}