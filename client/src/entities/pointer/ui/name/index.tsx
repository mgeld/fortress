import { FC, useEffect, useState } from "react";
import { useMap, useMapEvents } from "react-leaflet";

import { TLatLng } from "shared/types";

import styles from './styles.module.scss'

type TName = {
    position: TLatLng
    name: string
}

const Y_BACK = 64 +9
const X_BACK = 0

const Name: FC<TName> = ({
    position,
    name
}) => {

    const map = useMap()

    console.log('>>>>>>>>> Name position', position)
    console.log('>>>>>>>>> Name health', name)

    const [coords, setCoords] = useState(map.latLngToLayerPoint(position))

    useEffect(() => {
        setCoords(map.latLngToLayerPoint(position))
    }, [map, position])

    const __ = useMapEvents({
        zoomend: () => setCoords(map.latLngToLayerPoint(position)),
    })

    return (
        <div
            className={`${styles.markerName} strw1`}
            style={{
                top: `${coords.y - Y_BACK}px`,
                left: `${coords.x - X_BACK}px`,
            }}
        >
            <div className={styles.__name}>
                {name}
            </div>
        </div>
    )
}

export default Name