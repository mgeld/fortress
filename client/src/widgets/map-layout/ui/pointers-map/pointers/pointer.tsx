import { FC } from "react";
// import { TPointer } from "entities/pointer/model/pointer-map";
import { PointIcon } from "entities/pointer/ui/point-icon";
import Health from "entities/pointer/ui/health";
import { TPointer } from "@ctypes/model";
import Name from "entities/pointer/ui/name";

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
            <Name
                position={pointer.pos}
                name={pointer?.name || 'Аноним'}
            />
            <PointIcon
                position={pointer.pos}
                userIcon={pointer.icon || ''}
            />
        </>

    )
}

export default Pointer