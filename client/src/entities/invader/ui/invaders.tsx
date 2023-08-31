import { FC } from "react";
import { invaderMapModel } from "..";
import { Take } from "./take";
import { droneMapModel } from "entities/pointer";

type InvadersMapProps = {
}

const Invaders: FC<InvadersMapProps> = () => {

    const takes = invaderMapModel.selectors.useInvader().takes

    let sizeDrone = droneMapModel.selectors.useDroneSize()
    let sizeInvader = sizeDrone / 2

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