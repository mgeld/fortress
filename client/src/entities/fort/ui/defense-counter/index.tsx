import { TTakeHitPayload } from "@ctypes/socket/server-to-client";
import { FC, useEffect, useState } from "react";
import { useMap, useMapEvents } from "react-leaflet";

import styles from './styles.module.scss'

const Y_BACK = 98
const X_BACK = 50

const DefenseCounter: FC<TTakeHitPayload> = ({
    fort,
    status,
    defenders,
    invaders
}) => {

    const map = useMap()

    const [coords, setCoords] = useState(map.latLngToLayerPoint(fort))

    useEffect(() => {
        setCoords(map.latLngToLayerPoint(fort))
    }, [map, fort])

    const __ = useMapEvents({
        zoomend: () => setCoords(map.latLngToLayerPoint(fort)),
    })

    const p100 = (defenders + invaders)

    const pDefenders = defenders * 100 / p100
    const pInvaders = invaders * 100 / p100

    let sizeFort = 0
    switch (map.getZoom()) {
        case 18:
            sizeFort = 272
            break
        case 17:
            sizeFort = 136
            break
        case 16:
            sizeFort = 68
            break
        case 15:
            sizeFort = 34
            break
        case 14:
            sizeFort = 17
            break
        case 13:
            sizeFort = 8
            break
        case 12:
            sizeFort = 4
            break
        default:
            sizeFort = 1
    }

    return (
        <div
            className={styles.defenseCounter}
            style={{
                top: `${coords.y - (0) - 37}px`,
                left: `${coords.x - X_BACK}px`,
            }}
        >
            {defenders > 0 ? <div
                className={styles.__defenders}
                style={{
                    width: `${pDefenders}%`
                }}
            >
                <div className={styles.__count}>
                    <span>{defenders}</span>
                </div>
            </div> : null}
            {invaders > 0 ? <div
                className={styles.__invaders}
                style={{
                    width: `${pInvaders}%`
                }}
            >
                <div className={styles.__count}>
                    <span>{invaders}</span>
                </div>
            </div> : null}
            <div className={styles.__whiteEffect}><div /></div>
        </div>
    )
}

export default DefenseCounter