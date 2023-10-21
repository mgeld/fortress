import { FC, useEffect, useState } from "react";
import { useMap, useMapEvents } from "react-leaflet";

import styles from './styles.module.scss'
import { TFindContType, TLatLng } from "@ctypes/model";

const Y_BACK = 42
const X_BACK = 15

type TBootyPopup = {
    fort: TLatLng
    cont: TFindContType
}
const BootyPopup: FC<TBootyPopup> = ({
    cont,
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
            className={styles.bootyPopup}
            style={{
                top: `${coords.y - (0) - Y_BACK}px`,
                left: `${coords.x - X_BACK}px`,
            }}
        >

            <div className={styles.bootyIcon}>
                <img src={"icons/chest.png"} alt="<>" />
            </div>
            {/* {defenders > 0 ? <div
                className={styles.__defenders}
                style={{
                    width: `${pDefenders}%`
                }}
            >
                <div className={styles.__count}>
                    <span>{defenders}</span>
                </div>
            </div> : null} */}
            {/* {invaders > 0 ? <div
                className={styles.__invaders}
                style={{
                    width: `${pInvaders}%`
                }}
            >
                <div className={styles.__count}>
                    <span>{invaders}</span>
                </div>
            </div> : null} */}
            <div className={styles.__whiteEffect}><div /></div>
        </div>
    )
}

export default BootyPopup