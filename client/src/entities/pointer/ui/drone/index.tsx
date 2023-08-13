import { FC, useEffect, useState } from "react";
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
    size
}) => {

    const { fireHitTarget } = useHitFirePointer(health)

    console.log('zooooooooooooom', size)

    if (health < 1) return <></>

    const p = size * 3.14 / 3
    const a = p * 0.7
    const b = p * 0.3

    return (
        <>
            <Circle
                center={pos}
                className="drone-circle"
                pathOptions={{
                    dashArray: `${a} ${b}`,
                    weight: 8,
                    fillColor: fireHitTarget || health < 1 ? 'red' : '#3FF672',
                    fillOpacity: 0.7,
                    color: fireHitTarget || health < 1 ? 'red' : '#3FF672'
                }}
                radius={48} // стало так
            />
            <Circle
                center={pos}
                className="drone-center"
                radius={24}
                color="white"
                opacity={0.8}
                fillColor="white"
                fillOpacity={0.5}
            />
        </>

    )
}

export default Drone