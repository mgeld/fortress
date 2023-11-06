import { FC } from "react";
import { Circle } from "react-leaflet";
import { useHitFirePointer } from "../../hooks/use-hit-fire-pointer";

import { TLatLng } from "shared/types";

import './styles.css'

type TDroneProps = {
    health: number
    pos: TLatLng
    size: number
}

const Drone: FC<TDroneProps> = ({
    health,
    pos,
    size,
}) => {

    const { fireHitTarget } = useHitFirePointer(health)

    const p = size * 3.14 / 3
    const a = p * 0.6
    const b = p * 0.4

    const dashArrayDroneCircle = `${a} ${b}`
    const weightDroneCircle = Math.ceil(p / 5)
    const colorDroneCircle = fireHitTarget || health < 1 ? 'red' : '#7a29cc'

    return (
        <>
            {<Circle
                // key={z ? '1' : '2'}
                center={pos}
                className={"drone-circle"}
                pathOptions={{
                    dashArray: dashArrayDroneCircle,
                    weight: weightDroneCircle,
                    fillColor: colorDroneCircle,
                    fillOpacity: 0.9,
                    opacity: 1,
                    color: colorDroneCircle
                }}
                radius={30} // стало так
            />}
            <Circle
                center={pos}
                className="drone-center"                
                pathOptions={{
                    opacity: 0.9,
                    color: 'white',
                    weight: 2,
                    fillColor: '#322a35',
                    fillOpacity: 0.5
                }}
                radius={15}
            />
        </>

    )
}

export default Drone