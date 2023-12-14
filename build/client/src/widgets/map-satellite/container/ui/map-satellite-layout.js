"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_leaflet_1 = require("react-leaflet");
const citadel_1 = require("./citadel");
const map_1 = require("entities/map");
const sectors_map_1 = require("./sectors-map");
const model_1 = require("entities/areal/model");
const layout_rating_1 = require("widgets/layout-rating");
const MapSatelliteLayout = () => {
    const zone = layout_rating_1.ratingModel.selectors.useSelectZone();
    if (!(zone === null || zone === void 0 ? void 0 : zone.latlng))
        return <></>;
    const bounds = model_1.Areal.getBoundsSatellite(zone === null || zone === void 0 ? void 0 : zone.latlng);
    return (<div className='mapCard'>

            <react_leaflet_1.MapContainer ref={map_1.mapModel.events.setMap} className='_MapContainer' center={zone === null || zone === void 0 ? void 0 : zone.latlng} zoom={12} minZoom={12} maxZoom={17} maxBounds={bounds} zoomControl={false} doubleClickZoom={false} bounceAtZoomLimits={false}>
                <react_leaflet_1.TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                <react_leaflet_1.Pane name="zoom-anim-map">

                    

                    <react_leaflet_1.Pane key="citadel" name="citadel" style={{ zIndex: 3001 }}>
                        <citadel_1.CitadelMap />
                    </react_leaflet_1.Pane>
    

                </react_leaflet_1.Pane>

                <sectors_map_1.SectorsMap />

            </react_leaflet_1.MapContainer>

        </div>);
};
exports.default = MapSatelliteLayout;
