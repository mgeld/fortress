import { FC, useEffect, useState } from "react";
import { useMap, useMapEvents } from "react-leaflet";
import { TLatLng } from "shared/types";

import styles from './styles.module.scss'

type THealth = {
    position: TLatLng
    health: number
}

const Y_BACK = 64 + 24
const X_BACK = 32

const Health: FC<THealth> = ({
    position,
    health
}) => {

    const map = useMap()

    const [coords, setCoords] = useState(map.latLngToLayerPoint(position))

    useEffect(() => {
        setCoords(map.latLngToLayerPoint(position))
    }, [map, position])

    const __ = useMapEvents({
        zoomend: () => setCoords(map.latLngToLayerPoint(position)),
    })

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