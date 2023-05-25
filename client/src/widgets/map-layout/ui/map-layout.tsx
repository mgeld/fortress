import { FC, useEffect, useState } from "react";

import { LocationEvent, LatLng, LatLngBoundsExpression } from 'leaflet'

import {
    MapContainer,
    Popup,
    Marker,
    TileLayer,
    useMapEvents,
    Circle,
} from 'react-leaflet'

import { usePointer } from "entities/pointer/hooks/use-pointer";

import Fires from "entities/fire/ui/fires";
import Point from "entities/pointer/ui/point";

import { useUser } from "entities/user/model/user";
import { PointersMap } from "./pointers-map";

import './styles.scss'

type TMapProps = {}

// const bounds: LatLngBoundsExpression = [
//     [51.49, -0.08],
//     [51.5, -0.06]
// ]

const MapLayout: FC<TMapProps> = () => {

    const { point } = usePointer()

    const { userId, pos, health } = useUser()

    if (!point.load) return <>Load...</>

    return (
        <div className='mapCard'>

            <MapContainer
                className='_MapContainer'
                center={pos}
                zoom={16}
                zoomControl={false}
                scrollWheelZoom={true}
            >
                <TileLayer
                    // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <LocationMarker />

                <Circle
                    center={pos}
                    pathOptions={{
                        fillColor: 'green',
                        fillOpacity: 0.5,
                        color: 'red'
                    }}
                    // radius={(40000 / 360) * Math.cos(position[0])}
                    radius={40}
                />

                <Circle
                    center={[pos[0]-33.14, pos[1]]}
                    pathOptions={{
                        fillColor: 'green',
                        fillOpacity: 0.5,
                        color: 'red'
                    }}
                    // radius={(40000 / 360) * Math.cos(position[0])}
                    radius={40}
                />

                <Circle
                    center={[pos[0], pos[1]-0.0]}
                    pathOptions={{
                        fillColor: 'green',
                        fillOpacity: 0.5,
                        color: 'red'
                    }}
                    // radius={(40000 / 360) * Math.cos(position[0])}
                    radius={40}
                />

                <Point
                    pointer={{
                        userId,
                        pos,
                        health
                    }}
                    icon={point.icon}
                />

                <PointersMap />

                <Fires />

            </MapContainer>

        </div>

    )
}


function LocationMarker() {

    const [position, setPosition] = useState<LatLng | null>(null)

    const map = useMapEvents({
        click() {
            map.locate()
        },
        locationfound(e: LocationEvent) {
            setPosition(e.latlng)
            map.flyTo(e.latlng, map.getZoom())
        },
    })

    return position === null ? null : (
        <Marker position={position}>
            <Popup>You are here</Popup>
        </Marker>
    )
}

export default MapLayout