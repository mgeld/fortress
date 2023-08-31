import { ArenaBorder, arenaModel } from "entities/arena";
import { FC } from "react";

import { Areal } from "entities/areal/model";

export const ArenaRectangle: FC = () => {
    const place = arenaModel.selectors.useArena().data?.place

    if (!place) return <></>

    const bounds = Areal.getBounds(place)
    
    return (
        <ArenaBorder bounds={bounds} />
    )
}