import { FC, useEffect, useState } from "react";
import { Circle } from "react-leaflet";
import { TBomb } from "../model/bomb";

import styles from './styles.module.scss'

type TBombProps = {
    bomb: TBomb
}

export const Bomb: FC<TBombProps> = ({
    bomb
}) => {
    const [radius, setRadius] = useState<number>(1)

    useEffect(() => {
        setTimeout(() => setRadius(bomb.radius), 50)
    }, [bomb.radius])

    return (
        <Circle
            center={bomb.pos}
            className={`${styles.__bomb}`}
            pathOptions={{
                fillColor: 'red',
                stroke: false,
                fillOpacity: 0.5
            }}
            radius={radius}
        />
    )
}