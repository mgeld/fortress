import { FC } from "react";
import { useMap } from "react-leaflet";
import { TLatLng } from "shared/types";

import styles from './styles.module.scss'

type THealth = {
    position: TLatLng
    health: number
}

const Y_BACK = 98
const X_BACK = 35

const Health: FC<THealth> = ({
    position,
    health
}) => {

    const map = useMap()
    const coords = map.latLngToContainerPoint(position)

    return (
        <div
            className={styles.markerHealth}
            style={{
                top: `${coords.y - Y_BACK}px`,
                left: `${coords.x - X_BACK}px`,
            }}
        >
            <div
                className={styles.__health}
                style={{
                    width: `${health}%`,
                    backgroundColor: '#3FF672'
                }}
            />
            <div className={styles.__whiteEffect}><div /></div>
            <div className={styles.__count}>
                {health}
            </div>
        </div>
    )
}

export default Health