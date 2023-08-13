import { FC, useState } from "react";
import { Pane, useMap, useMapEvents } from "react-leaflet";
import { UserDrone } from "../user-pointer/drone";
import { Drones } from "../pointers/drones";
import { getSizeDroneForZoom } from "entities/pointer/lib/get-size-drone-for-zoom";

export const MapDrones: FC = () => {

    const zoom = useMap().getZoom()

    const [size, setSize] = useState(getSizeDroneForZoom(zoom))

    useMapEvents({
        zoomend: (e) => {
            setSize(getSizeDroneForZoom(e.target._zoom))
        }
    })


    return (
        <Pane name="drones" style={{ zIndex: 3001 }}>
            <UserDrone size={size} />
            <Drones size={size} />
        </Pane>
    )
}