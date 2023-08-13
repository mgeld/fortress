import { FC } from "react";
import { useMap } from "react-leaflet";
import { invaderMapModel } from "..";
import { Take } from "./take";
import { getSizeInvaderForZoom } from "../lib/get-size-invader-for-zoom";
import { getSizeDroneForZoom } from "entities/pointer/lib/get-size-drone-for-zoom";
// import { fireMapModel } from "..";

type InvadersMapProps = {
}

const Invaders: FC<InvadersMapProps> = () => {

    const takes = invaderMapModel.selectors.useInvader().takes

    const map = useMap()

    let sizeDrone = getSizeDroneForZoom(map.getZoom())
    let sizeInvader = getSizeInvaderForZoom(map.getZoom())

    return (
        <>
            {takes.map(take => {
                return <Take
                    key={'q' + take.id}
                    take={take}
                    sizeInvader={sizeInvader}
                    sizeDrone={sizeDrone}
                />
            })}
        </>
    )
}

export default Invaders