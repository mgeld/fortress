import { FC } from "react";
import { Circle } from "react-leaflet";
import { useHitFirePointer } from "../../hooks/use-hit-fire-pointer";

// import { TLatLng } from "shared/types";

import { TDroneProps } from ".";

import './styles.css'

const Drone: FC<TDroneProps> = ({
    health,
    pos,
    size,
}) => {

    const { fireHitTarget } = useHitFirePointer(health)

    // 0.8 = 80% от size
    // потом 2 * 0.8 = 1.6
    const p = size * 1.6 * 3.14 / 6
    const a = p * 0.1
    const b = p * 0.9

    const dashArrayDroneCircle = `${a} ${b}`
    const weightDroneCircle = Math.ceil(p / 4)
    const colorDroneCircle = fireHitTarget || health < 1 ? 'red' : '#393e46'

    return (
        <>
            {<Circle
                center={pos}
                className={"drone-border"}
                pathOptions={{
                    fillColor: colorDroneCircle,
                    opacity: 1,
                    fillOpacity: 0.9,
                    color: colorDroneCircle
                }}
                radius={30} // стало так
            />}
            {<Circle
                center={pos}
                className={"drone-circle"}
                pathOptions={{
                    dashArray: dashArrayDroneCircle,
                    weight: weightDroneCircle,
                    fillColor: colorDroneCircle,
                    fillOpacity: 0.9,
                    opacity: 1,
                    lineCap: 'round',
                    lineJoin: "miter",
                    color: '#ffc536'
                }}
                radius={24} // стало так
            />}
            <Circle
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
            />
        </>

    )
}

export default Drone