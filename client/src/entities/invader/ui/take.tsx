import { FC, useEffect, useRef, useState } from "react";
import { Circle, useMap, useMapEvents } from "react-leaflet";
import { randomNumber } from "shared/lib/randomNumber"
import { Keyframes } from "shared/ui/Keyframes/Keyframes";
import { TTake } from "../model/invader";
import styles from './styles.module.scss'
import { getDestination } from "entities/sector/lib/getDestination";
import { TLatLng } from "shared/types";

type TStyle = {
    top: number,
    left: number,
    transition?: string,
    animation: string
}

type TTakeProps = {
    take: TTake
    sizeInvader: number
    sizeDrone: number
}

export const Take: FC<TTakeProps> = ({ take, sizeInvader, sizeDrone }) => {

    console.log('-------take', take)

    // const map = useMap()
    // const coords = map.latLngToLayerPoint(take.from_pos)
    const toPosLatLng = getDestination(take.from_pos[0], take.from_pos[1], sizeDrone / 2, 90)

    const aa = Math.round((toPosLatLng[1] - take.from_pos[1]) * 100000)

    const [pos, setPos] = useState<TLatLng>([
        take.from_pos[0] + (randomNumber(-(aa), aa) / 100000),
        take.from_pos[1] + (randomNumber(-(aa), aa) / 100000)
    ])


    // const [invader, setInvader] = useState({
    //     from: map.latLngToLayerPoint(take.from_pos),
    //     to: map.latLngToLayerPoint(take.to_pos)
    // })

    useEffect(() => {
        setPos(take.to_pos)
    }, [take.to_pos])

    // const throttleSetCoords = () => {
    //     // setCoords(map.latLngToContainerPoint(position))
    //     setInvader({
    //         from: map.latLngToLayerPoint(take.from_pos),
    //         to: map.latLngToLayerPoint(take.to_pos)
    //     })
    // }

    ///////////////////////////////////////

    // const __ = useMapEvents({
    //     zoomend: () => setInvader({
    //         from: map.latLngToLayerPoint(take.from_pos),
    //         to: map.latLngToLayerPoint(take.to_pos)
    //     })
    //     // move: throttle(throttleSetCoords, 50)
    // })

    // const startPos = useRef([
    //     take.to_pos[0] + randomNumber(-(sizeToLatLng[0]), sizeToLatLng[0]),
    //     take.to_pos[0] + randomNumber(-(sizeToLatLng[1]), sizeToLatLng[1])
    // ])

    // let takeStyle: TStyle = {
    //     animation: `invader_${take.id} 2s ease-in`,
    //     top: coords.y,
    //     left: coords.x,
    // }

    const p = sizeInvader * 3.14 / 3
    const a = p  * 0.7
    const b = p * 0.3

    return (
        <>
            {/* <Keyframes
                key={String(take.id)}
                name={`invader_${take.id}`}
                _0={{
                    transform: `translate(${startPos.current[0]}px, ${startPos.current[1]}px)`
                }}
                _100={{
                    transform: `translate(${invader.to.x - invader.from.x}px, ${invader.to.y - invader.from.y}px)`
                }}
            /> */}
            <Circle
                center={pos}
                className={`${styles.__invader} ${take.id}`}
                pathOptions={{
                    dashArray: `${a} ${b}`,
                    weight: 4,
                    fillColor: '#3FF672',
                    fillOpacity: 0.7,
                    color: '#3FF672'
                }}
                radius={24}
            />
            {/* <div
                className={`${styles.__invader} ${take.id}`}
                style={{
                    ...takeStyle,
                    backgroundImage: `url("data:image/svg+xml;utf8,<svg width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><rect width='100%' height='100%' style='fill: none; stroke: red; stroke-width: ${sizeInvader / 4}px; stroke-dasharray: ${a} ${b}'/></svg>")`,
                    width: `${sizeInvader}px`,
                    height: `${sizeInvader}px`,
                    // outlineWidth: `${sizeInvader / 4}px`,
                }}
            /> */}
        </>
    )
}