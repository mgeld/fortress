import { FC, useEffect, useState } from "react";
import { useMap, useMapEvents } from "react-leaflet";

import styles from './styles.module.scss'
import { TLatLng } from "@ctypes/model";

const Y_BACK = 42

type TBootyPopup = {
    fort: TLatLng
}
const DetailsPopup: FC<TBootyPopup> = ({
    fort
}) => {

    const map = useMap()

    const [coords, setCoords] = useState(map.latLngToLayerPoint(fort))

    useEffect(() => {
        setCoords(map.latLngToLayerPoint(fort))
    }, [map, fort])

    const __ = useMapEvents({
        zoomend: () => setCoords(map.latLngToLayerPoint(fort)),
    })

    return (
        <div
            className={styles.detailsPopup}
            style={{
                top: `${coords.y - (0) - Y_BACK}px`,
                left: `${coords.x}px`,
            }}
        >
                Форт

            {/* <div className={styles.__whiteEffect}><div /></div> */}
        </div>
    )
}

export default DetailsPopup