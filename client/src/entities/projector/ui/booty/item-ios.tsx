import { FC, useEffect, useState } from "react";
import { ImageOverlay } from "react-leaflet";
import { latLng } from "leaflet";
import { randomNumber } from "shared/lib/randomNumber"
import styles from './styles.module.scss'
import { getDestination } from "shared/lib/getDestination";
import { TLatLng } from "shared/types";
import { TBooty } from "entities/projector/model/tractor-beam";

import IconCont1 from "shared/assets/icons/cont_1.svg";
import IconCont2 from "shared/assets/icons/cont_2.svg";
import IconCont3 from "shared/assets/icons/cont_3.svg";
// import IconInvader from "shared/assets/icons/cont_3.svg";

// "icons/invader.svg"

type TItemProps = {
    item: TBooty
    // sizeDrone: number
}

export const ItemIOS: FC<TItemProps> = ({ item }) => {

    const sizeDrone = 30

    const toPosLatLng = getDestination(
        item.from_pos[0],
        item.from_pos[1],
        sizeDrone / 2,
        90
    )

    const aa = Math.round((toPosLatLng[1] - item.from_pos[1]) * 100000)

    const [pos, setBootyPos] = useState<TLatLng>([
        item.from_pos[0] + (randomNumber(-(aa), aa) / 100000),
        item.from_pos[1] + (randomNumber(-(aa), aa) / 100000)
    ])

    useEffect(() => {
        setTimeout(() => setBootyPos(item.to_pos), 200)
    }, [item.to_pos])

    const bounds = latLng(pos[0], pos[1]).toBounds(30);

    return (
        <ImageOverlay
            className={`${styles.__booty} ${item.id}`}
            url={
                item.unit === 1 ? IconCont1 : 
                item.unit === 2 ? IconCont2 : 
                item.unit === 3 ? IconCont3 : 
                "icons/invader.svg"
            }
            bounds={bounds}
        />
        // <Rectangle
        //     bounds={bounds}
        //     className={`${styles.__booty} ${item.id}`}
        //     pathOptions={{
        //         weight: 4,
        //         fillColor: '#e47c5e',
        //         fillOpacity: 1,
        //         color: '#ffc935'
        //     }}
        // />
    )
}