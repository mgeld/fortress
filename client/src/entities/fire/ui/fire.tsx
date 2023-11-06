import { FC, useEffect, useState } from "react";
import { Circle, useMap } from "react-leaflet";
import { TLatLng } from "shared/types";
import { TFire } from "../model/fire";

import styles from './styles.module.scss'
import { fireLimit } from "../lib/fire-limit";

type TFireProps = {
    fire: TFire
}

export const Fire: FC<TFireProps> = ({
    fire
}) => {
    const [pos, setPos] = useState<TLatLng>(fire.from_pos)

    const map = useMap()

    const bounds = map.getBounds()

    let {limit_to_pos, time_fire} = fireLimit({
        fire,
        bounds
    })

    const fireClassName = `l${time_fire}`

    console.log('fireClassName', fireClassName)

    console.log('time_fire', time_fire)

    useEffect(() => {
        setTimeout(() => setPos(limit_to_pos), 50)
    }, [limit_to_pos])

    return (
        <>
            <Circle
                center={pos}
                className={`${styles.__fire} ${fireClassName}`}
                pathOptions={{
                    fillColor: '#3FF672',
                    stroke: false,
                    fillOpacity: 1
                }}
                radius={15}
            />
        </>
    )
}