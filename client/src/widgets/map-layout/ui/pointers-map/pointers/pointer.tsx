import { FC } from "react";
import { TPointer } from "entities/pointer/model/pointer-map";
import { PointIcon } from "entities/pointer/ui/point-icon";
import Health from "entities/pointer/ui/health";

type TPointProps = {
    pointer: TPointer
}

const Pointer: FC<TPointProps> = ({ pointer }) => {

    if (pointer.health < 1) return <></>

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

export default Pointer