import { FC, useEffect, useState } from "react";
import { Pane, useMap, useMapEvents } from "react-leaflet";
import { throttle } from "shared/lib/throttle";
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

    const [coords, setCoords] = useState(map.latLngToLayerPoint(position))

    useEffect(() => {
        setCoords(map.latLngToLayerPoint(position))
    }, [map, position])

    // const throttleSetCoords = () => {
    //     console.log('throttleSetCoords')
    //     setCoords(map.latLngToLayerPoint(position))
    // }

    const __ = useMapEvents({
        zoomend: () => setCoords(map.latLngToLayerPoint(position)),
        // moveend: throttle(throttleSetCoords, 50)
    })

    return (
        <>
            <div
                className={styles.markerHealth}
                style={{
                    // transform: `translate3d(${coords.x - X_BACK}px, ${coords.y - Y_BACK}px, 0px)`
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
        </>
    )
}

export default Health