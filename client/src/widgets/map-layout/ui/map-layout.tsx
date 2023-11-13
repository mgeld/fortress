import { FC, useState } from "react";

import { LocationEvent, LatLng, LatLngExpression } from 'leaflet'

import {
    MapContainer,
    Popup,
    Marker,
    TileLayer,
    useMapEvents,
    Circle,
    Pane,
} from 'react-leaflet'

import Fires from "entities/fire/ui/fires";

import { PointersMap } from "./pointers-map";

import './styles.scss'

import { mapModel } from "entities/map";
import { changeBattleStatusListener } from "features/battle/battle-change-status/model";
// import { Test } from "./test";
import { ArealRectangle } from "entities/areal/ui";
import Invaders from "entities/invader/ui/invaders";
import { SectorsMap } from "./sectors-map";
import { scrollMapPointerListener } from "features/map/scroll-map-pointer/model";

import { FortCounter } from "./fort-counter";
import { FortMap } from "./fort-map";
import { MapSelectPlace } from "features/map/select-place";
import { Citadel } from "entities/citadel";
import { isFireHitMe } from "features/fire/hit-fire-in";
import { isBombHitMe } from "features/bomb/mine-explosion";
import Bombs from "entities/bomb/ui/bombs";
import { ArenaRectangle } from "./arena-rectangle/ui";
import { setMapPosListener } from "features/user/set-map-pos/model";
import { setMaxBoundsListener } from "features/map/set-max-bounds/model";
import { filterPointers } from "features/pointer/filter-pointers/model";
import { BootyMap } from "./booty-map";
import { TestExtr } from "./test-extr";
import { TractorBeam } from "entities/projector/ui/tractor-beam";
import Booty from "entities/projector/ui/booty";
import { shipModel } from "entities/ship";
import { mapStartPosition } from "../model";

type TMapProps = {}

// const bounds: LatLngBoundsExpression = [
//     [51.49, -0.08],
//     [51.5, -0.06]
// ]

changeBattleStatusListener()
scrollMapPointerListener()
setMapPosListener()
setMaxBoundsListener()
filterPointers()
isFireHitMe()
isBombHitMe()

// type LatLng_ = LatLng & bearingTo: () => numb

// LatLng.prototype.bearingTo = function(other) {
//     var d2r  = L.LatLng.DEG_TO_RAD;
//     var r2d  = L.LatLng.RAD_TO_DEG;
//     var lat1 = this.lat * d2r;
//     var lat2 = other.lat * d2r;
//     var dLon = (other.lng-this.lng) * d2r;
//     var y    = Math.sin(dLon) * Math.cos(lat2);
//     var x    = Math.cos(lat1)*Math.sin(lat2) - Math.sin(lat1)*Math.cos(lat2)*Math.cos(dLon);
//     var brng = Math.atan2(y, x);
//     brng = parseInt( brng * r2d );
//     brng = (brng + 360) % 360;
//     return brng;
// };

const MapLayout: FC<TMapProps> = () => {

    const center: LatLngExpression = mapModel.selectors.useMapCenter()

    const mode = mapModel.selectors.useMapMode().mode

    // const areal = shipModel.selectors.useAreal()

    // if (areal) {
    //     console.log('LATLAT', areal[0][0] + ((areal[1][0] - areal[0][0]) / 2))
    //     console.log('LATLAT', areal[0][1] + ((areal[1][1] - areal[0][1]) / 2))
    // }
    // const { point } = usePointer()

    // if (!point.load) return <>Load...</>

    return (
        <div className='mapCard'>

            <MapContainer
                ref={mapModel.events.setMap}
                className='_MapContainer'
                center={center}
                zoom={16}
                maxZoom={17}
                zoomControl={false}
                // fadeAnimation={true}
                doubleClickZoom={false}
            // boxZoom={true}
            // scrollWheelZoom={true}
            // preferCanvas={true}
            // maxBoundsViscosity={0.1}
            // worldCopyJump={true}
            >
                <TileLayer
                    // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <TestExtr />

                {/* <Test /> */}

                {mode === 'select-place' ? <MapSelectPlace /> : null}

                {mode === 'invade' ? <ArealRectangle /> : <ArenaRectangle />}

                <Pane name="zoom-anim-map">

                    <Pane name="fort" style={{ zIndex: 3001 }}>
                        <FortMap />
                    </Pane>

                    <Pane name="citadel" style={{ zIndex: 3001 }}>
                        <Citadel />
                    </Pane>

                    <Pane name="fort-counter" style={{ zIndex: 3005 }}>
                        <FortCounter />
                    </Pane>


                    <Pane name="booty-map" style={{ zIndex: 3005 }}>
                        <BootyMap />
                    </Pane>

                    <Pane name="invaders" style={{ zIndex: 3000 }}>
                        <Invaders />
                    </Pane>

                    <Pane name="map-pointers" style={{ zIndex: 3002 }}>
                        <PointersMap />
                    </Pane>

                    <Pane name="beam" style={{ zIndex: 3001 }}>
                        <Booty />
                        <TractorBeam />
                    </Pane>

                </Pane>
                <Fires />

                <Bombs />

                <SectorsMap />

                {/* <LocationMarker /> */}
                {/* <ArenaMap /> */}

                {/* /// */}

                {/* <Rectangle
                    bounds={[[0.0, 0.0], [90.0, 90.0]]}
                    pathOptions={{
                        fillOpacity: 0,
                        fillRule: "nonzero",
                    }}
                    weight={1}
                /> */}

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

                {/* 
                {new Array(60).join('/').split('/').map((item, index) => {
                    return new Array(90).join('/').split('/').map((item, j) => {
                        console.log('index', index)
                        return (<Circle
                            center={[index, j]}
                            pathOptions={{
                                fillColor: 'green',
                                fillOpacity: 0.5,
                                color: 'red'
                            }}
                            // radius={(40000 / 360) * Math.cos(position[0])}
                            radius={50}
                        />)
                    })
                    // return (<Circle
                    //     center={[index, 0.0]}
                    //     pathOptions={{
                    //         fillColor: 'green',
                    //         fillOpacity: 0.5,
                    //         color: 'red'
                    //     }}
                    //     // radius={(40000 / 360) * Math.cos(position[0])}
                    //     radius={400}
                    // />)
                })} */}

                {/* {(() => {

                    const [lat_x, long_x] = getDestination(0, 0, 10000000, 90);
                    return (
                        <Polyline
                            positions={[[0, 0], [lat_x, long_x]]}
                            weight={10}
                        />
                    )
                })()}

                {(() => {

                    const [lat_x, long_x] = getDestination(0, 0, 10000000, 0);
                    return (
                        <Polyline
                            positions={[[0, 0], [lat_x, long_x]]}
                            weight={10}
                            color="red"
                        />
                    )
                })()} */}

                {/* {(() => {
                    return new Array(90).join('/').split('/').map((item, index) => {
                        const [lat_x, long_x] = getDestination(index, 0, 7000000, 90);
                        return (
                            <Polyline
                                positions={[[index, 0], [lat_x, long_x]]}
                                weight={2}
                                color="green"
                            />
                        )

                    })
                })()}

                {(() => {
                    return new Array(90).join('/').split('/').map((item, index) => {
                        const [lat_x, long_x] = getDestination(0, index, 7000000, 0);
                        return (
                            <Polyline
                                positions={[[0, index], [lat_x, long_x]]}
                                weight={2}
                                color="blue"
                            />
                        )

                    })
                })()} */}

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