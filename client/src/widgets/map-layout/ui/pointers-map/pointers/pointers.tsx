import { FC, useMemo } from "react"
import Point from "entities/pointer/ui/point"
import { pointerMapModel } from "entities/pointer"

export const Pointers: FC = () => {

    const pointers = pointerMapModel.selectors.usePointers().data

    console.log('12 Pointers')

    const memoPointers = useMemo(() => pointers.map(pointer => (
        <Point
            key={pointer.userId}
            pointer={pointer}
        />
    )), [pointers])

    return <>
        {memoPointers}
    </>
}