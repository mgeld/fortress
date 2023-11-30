import { FC, useEffect, useState } from "react";
import { useMap, useMapEvent } from "react-leaflet";
import { useHitFirePointer } from "../../hooks/use-hit-fire-pointer";

import { TLatLng } from "shared/types";

import { IconShip } from "shared/assets/icons/_icons";
// import { latLng } from "leaflet";


import './styles.css'

type TDroneProps = {
    health: number
    pos: TLatLng
    size: number
}

const DroneIOS: FC<TDroneProps> = ({
    health,
    pos,
    size,
}) => {

    const { fireHitTarget } = useHitFirePointer(health)

    // const p = size * 3.14 / 6
    // const a = p * 0.1
    // const b = p * 0.9

    // const [rotate, setRotate] = useState(true)

    // useEffect(() => {
    //     setRotate(false)
    //     setTimeout(() => setRotate(true), 4000)
    // }, [pos])

    // const dashArrayDroneCircle = `${a} ${b}`
    // const weightDroneCircle = Math.ceil(p / 4)
    // const colorDroneCircle = fireHitTarget || health < 1 ? 'red' : '#393e46'

    // const bounds = latLng(pos[0], pos[1]).toBounds(60);

    const map = useMap()
    const [point, setPoint] = useState(map.latLngToLayerPoint(pos))

    useEffect(() => {
        setPoint(map.latLngToLayerPoint(pos))
    }, [pos, map])

    useMapEvent('zoom', (e) => {
        setPoint(map.latLngToLayerPoint(pos))
    })

    // const myPos = shipModel.selectors.useShipPos()

    size = size  * 2

    // const point = map.latLngToLayerPoint(pos)

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
                {/* <img
                    style={{
                        width: `${size}px`,
                        height: `${size}px`
                    }}
                    src={Ship} alt="<>"
                /> */}
            </div>
            {/* <ImageOverlay
                className={`drone-ios${rotate ? ' drone-ios-rotate' : ''}`}
                url="icons/ship.svg"
                bounds={bounds}
            /> */}
            {/* <Circle
                center={pos}
                className="drone-center"
                pathOptions={{
                    opacity: 0.9,
                    color: '#2a2e33',
                    weight: 2,
                    fillColor: '#63dafc',
                    fillOpacity: 0.9
                }}
                radius={14}
            /> */}
        </>
    )
}

export default DroneIOS