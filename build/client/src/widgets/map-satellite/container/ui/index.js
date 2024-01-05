"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapSatelliteLayout = void 0;
const react_leaflet_1 = require("react-leaflet");
const citadel_1 = require("./citadel");
const map_1 = require("entities/map");
const sectors_map_1 = require("./sectors-map");
const model_1 = require("entities/areal/model");
const h3_js_1 = require("h3-js");
const MapSatelliteLayout = () => {
    const satellite = map_1.mapSatelliteModel.selectors.useMapSatellite();
    if (!(satellite === null || satellite === void 0 ? void 0 : satellite.latlng))
        return <></>;
    const bounds = model_1.Areal.getBoundsSatellite(satellite === null || satellite === void 0 ? void 0 : satellite.latlng);
    return (<div className='mapCard'>

            <react_leaflet_1.MapContainer ref={map_1.mapModel.events.setMap} className='_MapContainer' center={satellite === null || satellite === void 0 ? void 0 : satellite.latlng} zoom={satellite.type === 'zone' ? 12 : 15} minZoom={12} maxZoom={17} maxBounds={bounds} zoomControl={false} doubleClickZoom={false} bounceAtZoomLimits={false}>
                <react_leaflet_1.TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                <react_leaflet_1.Pane name="zoom-anim-map">

                    

                    <react_leaflet_1.Pane key="citadel" name="citadel" style={{ zIndex: 3001 }}>
                        <citadel_1.CitadelMap />
                    </react_leaflet_1.Pane>

                    

                </react_leaflet_1.Pane>

    

                <react_leaflet_1.Polygon weight={0.9} pathOptions={{
            color: '#bd64f8',
            fillOpacity: 0,
            weight: 2
        }} positions={(0, h3_js_1.cellToBoundary)((0, h3_js_1.latLngToCell)(satellite.latlng[0], satellite.latlng[1], 9))}/>

                <sectors_map_1.SectorsMap />

            </react_leaflet_1.MapContainer>

        </div>);
};
exports.MapSatelliteLayout = MapSatelliteLayout;
