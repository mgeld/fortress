import { TPointer } from "entities/pointer/model/pointer-map";
import { FC } from "react";
import { Circle, Marker } from "react-leaflet";
import { pointIcon } from "widgets/map-layout/lib/point-icon";
import { useHitFirePointer } from "../hooks/use-hit-fire-pointer";
import Health from "./health";

type TPointProps = {
    pointer: TPointer
    icon: string
}

const Point: FC<TPointProps> = ({
    pointer,
    icon,
}) => {

    const { fireHitTarget } = useHitFirePointer(pointer.health)

    let iconPoint = pointIcon(icon)

    return (
        <>
            <Health
                position={pointer.pos}
                health={pointer.health}
            />
            <Marker
                position={pointer.pos}
                icon={iconPoint}
            />

            <Circle
                center={pointer.pos}
                pathOptions={{
                    fillColor: fireHitTarget ? 'red' : '#3FF672',
                    fillOpacity: 0.7,
                    color: fireHitTarget ? 'red' : '#3FF672'
                }}
                // radius={(40000 / 360) * Math.cos(position[0])}
                radius={0.0004 * Math.cos(pointer.pos[0]) * 111319.9}
            />
            <Circle
                center={pointer.pos}
                radius={15}
                color="white"
                opacity={0.8}
                fillColor="white"
                fillOpacity={0.5}
            />
        </>

    )
}

export default Point