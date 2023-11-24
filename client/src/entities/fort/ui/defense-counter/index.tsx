import { TTakeHitPayload } from "@ctypes/socket/server-to-client";
import { FC, useEffect, useState } from "react";
import { useMap, useMapEvents } from "react-leaflet";

import styles from './styles.module.scss'
import { userModel } from "entities/user";
import { mapModel } from "entities/map";
import { arenaModel } from "entities/arena";

const Y_BACK = 37
const X_BACK = 50

const DefenseCounter: FC<TTakeHitPayload> = ({
    fort,
    status,
    defenders,
    invaders,
    owner
}) => {

    const map = useMap()

    const [coords, setCoords] = useState(map.latLngToLayerPoint(fort))

    const myId = mapModel.selectors.useMapMode().mode === 'invade' ?
        userModel.selectors.useUserId() :
        arenaModel.selectors.useMyTeamId().data

    useEffect(() => {
        setCoords(map.latLngToLayerPoint(fort))
    }, [map, fort])

    const __ = useMapEvents({
        zoomend: () => setCoords(map.latLngToLayerPoint(fort)),
    })

    const p100 = (defenders + invaders)

    const pDefenders = defenders * 100 / p100
    const pInvaders = invaders * 100 / p100

    const styleI = myId !== owner ? styles.__green : styles.__red
    const styleD = myId !== owner ? styles.__red : styles.__green

    return (
        <div
            className={styles.defenseCounter}
            style={{
                top: `${coords.y - (0) - Y_BACK}px`,
                left: `${coords.x - X_BACK}px`,
            }}
        >

            {defenders > 0 ? <div
                className={styleD}
                style={{
                    width: `${pDefenders}%`
                }}
            >
                <div className={styles.__count}>
                    <span>{defenders}</span>
                </div>
            </div> : null}

            {invaders > 0 ? <div
                className={styleI}
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