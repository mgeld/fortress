import { FC } from "react";

import {
    Pane,
    TileLayer,
    MapContainer,
    Polygon,
} from 'react-leaflet'

import { CitadelMap } from "./citadel";
import { mapModel, mapSatelliteModel } from "entities/map";
import { SectorsMap } from "./sectors-map";
import { Areal } from "entities/areal/model";
import { cellToBoundary, latLngToCell } from "h3-js";
// import { ratingModel } from "widgets/layout-rating";

type TMapProps = {}

export const MapSatelliteLayout: FC<TMapProps> = () => {

    // const zone = ratingModel.selectors.useSelectZone()

    const satellite = mapSatelliteModel.selectors.useMapSatellite()

    console.log('MapSatelliteLayout satellite', satellite)

    if (!satellite?.latlng) return <></>

    const bounds = Areal.getBoundsSatellite(satellite?.latlng)

    return (
        <div className='mapCard'>

            <MapContainer
                ref={mapModel.events.setMap}
                className='_MapContainer'
                center={satellite?.latlng}
                zoom={satellite.type === 'zone'? 12 : 15}
                minZoom={12}
                maxZoom={17}
                maxBounds={bounds}
                zoomControl={false}
                doubleClickZoom={false}
                bounceAtZoomLimits={false}
                // preferCanvas={true}
            >
                <TileLayer
                    // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Pane name="zoom-anim-map">

                    {/*
                    <Pane key="fort" name="fort" style={{ zIndex: 3001 }}>
                        <FortMap />
                    </Pane>
                    */}

                    <Pane key="citadel" name="citadel" style={{ zIndex: 3001 }}>
                        <CitadelMap />
                    </Pane>

                    {/* 
                    <Pane key="fort-map" name="fort-map" style={{ zIndex: 3005 }}>
                        <FortDetailsMap />
                    </Pane>
                    */}

                </Pane>

{/* 
                <Circle
                    center={satellite.latlng}
                    radius={90}
                /> */}

                <Polygon
                    weight={0.9}
                    pathOptions={{
                        color: '#bd64f8',
                        fillOpacity: 0,
                        weight: 2
                    }}
                    positions={cellToBoundary(latLngToCell(satellite.latlng[0], satellite.latlng[1], 9))}
                />

                <SectorsMap />

            </MapContainer>

        </div>

    )
}