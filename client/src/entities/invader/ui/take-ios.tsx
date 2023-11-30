import { FC, useEffect, useState } from "react";
import { ImageOverlay } from "react-leaflet";
import { randomNumber } from "shared/lib/randomNumber"
import { TTake } from "../model/invader";
import { getDestination } from "entities/sector/lib/getDestination";
import { TLatLng } from "shared/types";
import { latLng } from "leaflet";

import styles from './styles.module.scss'

type TTakeProps = {
    take: TTake
    // sizeInvader: number
    // sizeDrone: number
}

export const TakeIOS: FC<TTakeProps> = ({ take }) => {

    // console.log('-------take', take)

    // console.log('sizeDrone', sizeDrone)

    const sizeDrone = 30

    const toPosLatLng = getDestination(take.from_pos[0], take.from_pos[1], sizeDrone / 2, 90)

    const aa = Math.round((toPosLatLng[1] - take.from_pos[1]) * 100000)

    const [pos, setTakePos] = useState<TLatLng>([
        take.from_pos[0] + (randomNumber(-(aa), aa) / 100000),
        take.from_pos[1] + (randomNumber(-(aa), aa) / 100000)
    ])

    useEffect(() => {
        setTimeout(() => setTakePos(take.to_pos), 50)
    }, [take.to_pos])

    const bounds = latLng(pos[0], pos[1]).toBounds(30);

    return (
        <>
            <ImageOverlay
                className={`${styles.__invader} ${take.id}`}
                url="icons/invader.svg"
                bounds={bounds}
            />
        </>
    )
}