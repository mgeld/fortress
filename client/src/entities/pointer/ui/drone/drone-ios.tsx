import { FC, useEffect, useState } from "react";
import { useMap, useMapEvent } from "react-leaflet";
import { useHitFirePointer } from "../../hooks/use-hit-fire-pointer";

import { TLatLng } from "shared/types";
import { IconShip } from "shared/assets/icons/_icons";
import { metersToPx } from "shared/lib/metersToPx";

import './styles.css'

type TDroneProps = {
    health: number
    pos: TLatLng
}

const DroneIOS: FC<TDroneProps> = ({
    health,
    pos,
}) => {

    const { fireHitTarget } = useHitFirePointer(health)

    const map = useMap()

    const [size, setZise] = useState(metersToPx(map.getCenter().lat, 60, map.getZoom()))

    const [point, setPoint] = useState(map.latLngToLayerPoint(pos))

    useEffect(() => {
        setPoint(map.latLngToLayerPoint(pos))
    }, [pos, map])

    useMapEvent('zoom', (e) => {
        setPoint(map.latLngToLayerPoint(pos))
        setZise(metersToPx(pos[0], 60, map.getZoom()))
    })

    const colorDroneCircle = fireHitTarget || health < 1 ? 'red' : '#393e46'

    return (
        <>
            <div
                className="drone-div"
                style={{
                    top: `${point.y}px`,
                    left: `${point.x}px`,
                    width: `${size}px`,
                    height: `${size}px`,
                    marginTop: `-${(size / 2)}px`,
                    marginLeft: `-${(size / 2)}px`,
                }}
            >
                <IconShip
                    width={size}
                    height={size}
                    fill={colorDroneCircle}
                />
            </div>
        </>
    )
}

export default DroneIOS