import { FC, useEffect, useState } from "react";
import { Rectangle } from "react-leaflet";
import L, { latLng } from "leaflet";
import { randomNumber } from "shared/lib/randomNumber"
import styles from './styles.module.scss'
import { getDestination } from "entities/sector/lib/getDestination";
import { TLatLng } from "shared/types";
import { TBooty } from "entities/projector/model/tractor-beam";

type TItemProps = {
    item: TBooty
    // sizeDrone: number
}

export const Item: FC<TItemProps> = ({ item }) => {

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
        <Rectangle
            bounds={bounds}
            className={`${styles.__booty} ${item.id}`}
            pathOptions={{
                weight: 4,
                fillColor: '#e47c5e',
                fillOpacity: 1,
                color: '#ffc935'
            }}
        />
    )
}