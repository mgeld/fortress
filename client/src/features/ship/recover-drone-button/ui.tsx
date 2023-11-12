import { FC, useEffect, useState } from "react";
import { useMap, useMapEvents } from "react-leaflet";
import { TLatLng } from "shared/types";

import styles from './styles.module.scss'
import { popoutModel } from "shared/ui/popout-root";

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
        <div
            onClick={() => popoutModel.events.setPopout('ship-improve-health')}
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
    )
}

export default RecoverDroneButton