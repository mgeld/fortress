import { FC, useState } from "react";
import { Pane, useMap, useMapEvents } from "react-leaflet";
import { UserDrone } from "../user-pointer/drone";
import { Drones } from "../pointers/drones";
import { getSizeDroneForZoom } from "entities/pointer/lib/get-size-drone-for-zoom";
import { getDestination } from "entities/sector/lib/getDestination";
import { droneMapModel } from "entities/pointer";


export const MapDrones: FC = () => {

    const map = useMap()
    const zoom = map.getZoom()
    const posCenterLatLng = map.getCenter()

    // const [size, setSize] = useState(getSizeDroneForZoom(zoom))

    const size = droneMapModel.selectors.useDroneSize()

    console.log('size size size', size)

    let sizeDrone = size

    useMapEvents({
        zoomend: (e) => {

            droneMapModel.events.setSizeDrone()

            // const toPosLatLng = getDestination(posCenterLatLng.lat, posCenterLatLng.lng, 96, 90)
        
            // const fromPoint = map.latLngToLayerPoint(posCenterLatLng)
            // const toPoint = map.latLngToLayerPoint(toPosLatLng)
        
            // console.log('fromPoint', fromPoint)
            // console.log('toPoint', toPoint)
            // const _size = toPoint.x - fromPoint.x
            // // setSize(_size)
        }
    })


    return (
        <Pane name="drones" style={{ zIndex: 3001 }}>
            <UserDrone size={size} />
            <Drones size={size} />
        </Pane>
    )
}