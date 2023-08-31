import { FC, useMemo } from "react"
import { pointerMapModel } from "entities/pointer"
import Pointer from "./pointer"

export const Pointers: FC = () => {

    const pointers = pointerMapModel.selectors.usePointers().data

    console.log('12 Pointers')

    const memoPointers = useMemo(() => pointers.map(pointer => (
        <Pointer
            key={pointer.userId}
            pointer={pointer}
        />
    )), [pointers])

    return <>
        {memoPointers}
    </>
}