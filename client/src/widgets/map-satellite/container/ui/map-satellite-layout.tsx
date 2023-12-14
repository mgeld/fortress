import { FC } from "react";

import {
    Pane,
    TileLayer,
    MapContainer,
} from 'react-leaflet'

import { CitadelMap } from "./citadel";
import { mapModel } from "entities/map";
import { SectorsMap } from "./sectors-map";
import { Areal } from "entities/areal/model";
import { ratingModel } from "widgets/layout-rating";

type TMapProps = {}

const MapSatelliteLayout: FC<TMapProps> = () => {

    const zone = ratingModel.selectors.useSelectZone()

    if(!zone?.latlng) return <></>

    const bounds = Areal.getBoundsSatellite(zone?.latlng)

    return (
        <div className='mapCard'>

            <MapContainer
                ref={mapModel.events.setMap}
                className='_MapContainer'
                center={zone?.latlng}
                zoom={12}
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

                    {/* <Pane key="fort" name="fort" style={{ zIndex: 3001 }}>
                        <FortMap />
                    </Pane> */}

                    <Pane key="citadel" name="citadel" style={{ zIndex: 3001 }}>
                        <CitadelMap />
                    </Pane>
{/* 
                    <Pane key="fort-map" name="fort-map" style={{ zIndex: 3005 }}>
                        <FortDetailsMap />
                    </Pane> */}

                </Pane>

                <SectorsMap />

            </MapContainer>

        </div>

    )
}


export default MapSatelliteLayout