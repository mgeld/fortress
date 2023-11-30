import { FC, useEffect, useRef, useState } from "react";
import { Circle, useMap, useMapEvents } from "react-leaflet";
import { randomNumber } from "shared/lib/randomNumber"
// import { Keyframes } from "shared/ui/Keyframes/Keyframes";
import { TTake } from "../model/invader";
import styles from './styles.module.scss'
import { getDestination } from "entities/sector/lib/getDestination";
import { TLatLng } from "shared/types";

// type TStyle = {
//     top: number,
//     left: number,
//     transition?: string,
//     animation: string
// }

type TTakeProps = {
    take: TTake
    sizeInvader: number
    // sizeDrone: number
}

export const Take: FC<TTakeProps> = ({ take, sizeInvader }) => {

    // console.log('-------take', take)

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

    const p = sizeInvader * 3.14 / 3
    const a = p * 0.2
    const b = p * 0.8

    const weightDroneCircle = Math.ceil(p / 4)

    return (
        <>
            <Circle
                center={pos}
                className={`${styles.__invader} ${take.id}`}
                pathOptions={{
                    dashArray: `${a} ${b}`,
                    weight: weightDroneCircle,
                    fillColor: '#fa3226',
                    fillOpacity: 0.7,
                    color: '#3c505a',
                }}
                radius={12}
            />
        </>
    )
}