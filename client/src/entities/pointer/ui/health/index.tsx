import { FC, useEffect, useState } from "react";
import { useMap, useMapEvents } from "react-leaflet";

import { TLatLng } from "shared/types";

import styles from './styles.module.scss'
import { ShipLevel, TShipLevel } from "entities/ship/lib/ship-level";

type THealth = {
    position: TLatLng
    lvl: number
    health: number
}

const Y_BACK = 64 + 24
const X_BACK = 32

const Health: FC<THealth> = ({
    position,
    lvl,
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

    const progressHealth = health * 100 / ShipLevel.getMaxHealth(lvl as TShipLevel)

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
                    width: `${progressHealth}%`,
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