import { FC, useEffect, useState } from "react";

import { LocationEvent, LatLng, LatLngBoundsExpression } from 'leaflet'

import {
    MapContainer,
    Popup,
    Marker,
    TileLayer,
    useMapEvents,
    Circle,
    Rectangle,
} from 'react-leaflet'

import { usePointer } from "entities/pointer/hooks/use-pointer";

import Fires from "entities/fire/ui/fires";
import Point from "entities/pointer/ui/point";

import { PointersMap } from "./pointers-map";

import './styles.scss'
import { userModel } from "entities/user";
import { ArenaMap } from "./arena-map";
import { mapModel } from "entities/map";
import { changeBattleStatusListener } from "features/battle/battle-change-status/model";
import { Areal } from "entities/areal/model";
import { Test } from "./test";

type TMapProps = {}

// const bounds: LatLngBoundsExpression = [
//     [51.49, -0.08],
//     [51.5, -0.06]
// ]

changeBattleStatusListener()

const MapLayout: FC<TMapProps> = () => {

    const { point } = usePointer()

    const { userId, pos, health } = userModel.selectors.useUser()

    if (!point.load) return <>Load...</>

    return (
        <div className='mapCard'>

            <MapContainer
                ref={mapModel.events.setMap}
                className='_MapContainer'
                center={pos}
                zoom={5}
                zoomControl={false}
                scrollWheelZoom={true}
            >
                <TileLayer
                    // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <LocationMarker />

                <Test />

                <Rectangle
                    bounds={Areal.getBounds(pos)}
                    pathOptions={{
                        fillOpacity: 0,
                        fillRule: "nonzero",
                    }}
                    weight={1}
                />

                <Rectangle
                    bounds={[[0.0, 0.0], [90.0,90.0]]}
                    pathOptions={{
                        fillOpacity: 0,
                        fillRule: "nonzero",
                    }}
                    weight={1}
                />

                <Rectangle
                    bounds={Areal.getBounds(pos)}
                    pathOptions={{
                        fillOpacity: 0,
                        fillRule: "nonzero",
                    }}
                    weight={1}
                />

                {/* <ArenaMap /> */}

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
                    center={[0.0, 0.0]}
                    pathOptions={{
                        fillColor: 'black',
                        fillOpacity: 0.5,
                        color: 'black'
                    }}
                    // radius={(40000 / 360) * Math.cos(position[0])}
                    radius={100}
                />

                <Circle
                    center={[pos[0] - 33.14, pos[1]]}
                    pathOptions={{
                        fillColor: 'green',
                        fillOpacity: 0.5,
                        color: 'red'
                    }}
                    // radius={(40000 / 360) * Math.cos(position[0])}
                    radius={40}
                />

                <Circle
                    center={[pos[0], pos[1] - 0.0]}
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