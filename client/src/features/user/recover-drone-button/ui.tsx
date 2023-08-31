import { FC, useEffect, useState } from "react";
import { useMap, useMapEvents } from "react-leaflet";
import { TLatLng } from "shared/types";

import styles from './styles.module.scss'

type TProps = {
    position: TLatLng
}

const Y_BACK = 98
const X_BACK = 55

const RecoverDroneButton: FC<TProps> = ({
    position,
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
        <>
            <div
                className={styles.recoverDroneButton}
                style={{
                    top: `${coords.y - Y_BACK}px`,
                    left: `${coords.x - X_BACK}px`,
                }}
            >
                <div className={styles.__whiteEffect}><div /></div>
                <div className={styles.__text}>
                    Восстановить
                </div>
            </div>
        </>
    )
}

export default RecoverDroneButton