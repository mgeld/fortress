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

import { mapModel } from "entities/map";
import { changeBattleStatusListener } from "features/battle/battle-change-status/model";
import { ArealRectangle } from "entities/areal/ui";
import { SectorsMap } from "./sectors-map";
import { scrollMapPointerListener } from "features/map/scroll-map-pointer/model";

import { FortCounter } from "./fort-counter";
import { FortMap } from "./fort-map";
import { MapSelectPlace } from "features/map/select-place";
import { isFireHitMe } from "features/fire/hit-fire-in";
import { isBombHitMe } from "features/bomb/mine-explosion";
import { ArenaRectangle } from "./arena-rectangle/ui";
import { setMapPosListener } from "features/user/set-map-pos/model";
import { setMaxBoundsListener } from "features/map/set-max-bounds/model";
import { filterPointers } from "features/pointer/filter-pointers/model";
import { BootyMap } from "./booty-map";
import { TractorBeam } from "entities/projector/ui/tractor-beam";
import { FortDetailsMap } from "./fort-details-map";

import Bombs from "entities/bomb/ui/bombs";
import Booty from "entities/projector/ui/booty";
import Invaders from "entities/invader/ui/invaders";
import { CitadelMap } from "./citadel";

type TMapProps = {}

changeBattleStatusListener()
scrollMapPointerListener()
setMapPosListener()
setMaxBoundsListener()
filterPointers()
isFireHitMe()
isBombHitMe()

const MapLayout: FC<TMapProps> = () => {

    const mode = mapModel.selectors.useMapMode().mode

    const center: LatLngExpression = mapModel.selectors.useMapCenter()

    console.log('MapLayout')

    return (
        <div className='mapCard'>

            <MapContainer
                ref={mapModel.events.setMap}
                className='_MapContainer'
                center={center}
                zoom={16}
                minZoom={15}
                maxZoom={17}
                doubleClickZoom={false}
                zoomControl={false}
                bounceAtZoomLimits={false}
            >
                <TileLayer
                    // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* <TestExtr /> */}
                {/* <Test /> */}

                {mode === 'select-place' ? <MapSelectPlace /> : null}

                {mode === 'invade' ? <ArealRectangle /> : <ArenaRectangle />}

                <Pane name="zoom-anim-map">

                    <Pane key="fort" name="fort" style={{ zIndex: 3001 }}>
                        <FortMap />
                    </Pane>

                    <Pane key="citadel" name="citadel" style={{ zIndex: 3001 }}>
                        <CitadelMap />
                    </Pane>

                    <Pane key="fort-counter" name="fort-counter" style={{ zIndex: 3005 }}>
                        <FortCounter />
                    </Pane>

                    <Pane key="booty-map" name="booty-map" style={{ zIndex: 3005 }}>
                        <BootyMap />
                    </Pane>

                    <Pane key="fort-map" name="fort-map" style={{ zIndex: 3005 }}>
                        <FortDetailsMap />
                    </Pane>

                    <Pane key="invaders" name="invaders" style={{ zIndex: 3000 }}>
                        <Invaders />
                    </Pane>

                    <Pane key="map-pointers" name="map-pointers" style={{ zIndex: 3002 }}>
                        <PointersMap />
                    </Pane>

                    <Pane key="beam" name="beam" style={{ zIndex: 3001 }}>
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