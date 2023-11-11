import { FC } from "react";
// import { TPointer } from "entities/pointer/model/pointer-map";
import { PointIcon } from "entities/pointer/ui/point-icon";
import Health from "entities/pointer/ui/health";
import { TPointer } from "@ctypes/model";

type TPointProps = {
    pointer: TPointer
}

const Pointer: FC<TPointProps> = ({ pointer }) => {

    if (pointer.health < 1) return <></>

    return (
        <>
            <Health
                lvl={pointer.lvl}
                position={pointer.pos}
                health={pointer.health}
            />
            <PointIcon
                position={pointer.pos}
                userIcon={pointer.icon || ''}
                userName={pointer.name || ''}
            />
        </>

    )
}

export default Pointer