import { FC } from "react";
import Health from "./health";
import { TPointer } from "entities/pointer/model/pointer-map";
import { PointIcon } from "./point-icon";

type TPointProps = {
    pointer: TPointer
}

const Point: FC<TPointProps> = ({ pointer }) => {

    if (pointer.health < 1) return <></>

    console.log('11 Point')

    return (
        <>
            <Health
                position={pointer.pos}
                health={pointer.health}
            />
            <PointIcon
                position={pointer.pos}
                userIcon={pointer.icon || ''}
                userName={pointer.userName || ''}
            />
        </>

    )
}

export default Point