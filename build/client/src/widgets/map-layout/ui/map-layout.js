"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_leaflet_1 = require("react-leaflet");
const fires_1 = __importDefault(require("entities/fire/ui/fires"));
const pointers_map_1 = require("./pointers-map");
require("./styles.css");
const map_1 = require("entities/map");
const model_1 = require("features/battle/battle-change-status/model");
const ui_1 = require("entities/areal/ui");
const sectors_map_1 = require("./sectors-map");
const model_2 = require("features/map/scroll-map-pointer/model");
const fort_counter_1 = require("./fort-counter");
const fort_map_1 = require("./fort-map");
const select_place_1 = require("features/map/select-place");
const citadel_1 = require("entities/citadel");
const hit_fire_in_1 = require("features/fire/hit-fire-in");
const mine_explosion_1 = require("features/bomb/mine-explosion");
const ui_2 = require("./arena-rectangle/ui");
const model_3 = require("features/user/set-map-pos/model");
const model_4 = require("features/map/set-max-bounds/model");
const model_5 = require("features/pointer/filter-pointers/model");
const booty_map_1 = require("./booty-map");
const tractor_beam_1 = require("entities/projector/ui/tractor-beam");
const fort_details_map_1 = require("./fort-details-map");
const bombs_1 = __importDefault(require("entities/bomb/ui/bombs"));
const booty_1 = __importDefault(require("entities/projector/ui/booty"));
const invaders_1 = __importDefault(require("entities/invader/ui/invaders"));
(0, model_1.changeBattleStatusListener)();
(0, model_2.scrollMapPointerListener)();
(0, model_3.setMapPosListener)();
(0, model_4.setMaxBoundsListener)();
(0, model_5.filterPointers)();
(0, hit_fire_in_1.isFireHitMe)();
(0, mine_explosion_1.isBombHitMe)();
const MapLayout = () => {
    const center = map_1.mapModel.selectors.useMapCenter();
    const mode = map_1.mapModel.selectors.useMapMode().mode;
    console.log('MapLayout');
    return (<div className='mapCard'>

            <react_leaflet_1.MapContainer ref={map_1.mapModel.events.setMap} className='_MapContainer' center={center} zoom={16} minZoom={15} maxZoom={17} doubleClickZoom={false} zoomControl={false} bounceAtZoomLimits={false}>
                <react_leaflet_1.TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

                

                

                {mode === 'select-place' ? <select_place_1.MapSelectPlace /> : null}

                {mode === 'invade' ? <ui_1.ArealRectangle /> : <ui_2.ArenaRectangle />}

                <react_leaflet_1.Pane name="zoom-anim-map">

                    <react_leaflet_1.Pane key="fort" name="fort" style={{ zIndex: 3001 }}>
                        <fort_map_1.FortMap />
                    </react_leaflet_1.Pane>

                    <react_leaflet_1.Pane key="citadel" name="citadel" style={{ zIndex: 3001 }}>
                        <citadel_1.Citadel />
                    </react_leaflet_1.Pane>

                    <react_leaflet_1.Pane key="fort-counter" name="fort-counter" style={{ zIndex: 3005 }}>
                        <fort_counter_1.FortCounter />
                    </react_leaflet_1.Pane>

                    <react_leaflet_1.Pane key="booty-map" name="booty-map" style={{ zIndex: 3005 }}>
                        <booty_map_1.BootyMap />
                    </react_leaflet_1.Pane>

                    <react_leaflet_1.Pane key="fort-map" name="fort-map" style={{ zIndex: 3005 }}>
                        <fort_details_map_1.FortDetailsMap />
                    </react_leaflet_1.Pane>

                    <react_leaflet_1.Pane key="invaders" name="invaders" style={{ zIndex: 3000 }}>
                        <invaders_1.default />
                    </react_leaflet_1.Pane>

                    <react_leaflet_1.Pane key="map-pointers" name="map-pointers" style={{ zIndex: 3002 }}>
                        <pointers_map_1.PointersMap />
                    </react_leaflet_1.Pane>

                    <react_leaflet_1.Pane key="beam" name="beam" style={{ zIndex: 3001 }}>
                        <booty_1.default />
                        <tractor_beam_1.TractorBeam />
                    </react_leaflet_1.Pane>

                </react_leaflet_1.Pane>

                <fires_1.default />

                <bombs_1.default />

                <sectors_map_1.SectorsMap />

                
                

                

                <react_leaflet_1.Circle center={[0.0, 0.0]} pathOptions={{
            fillColor: 'black',
            fillOpacity: 0.5,
            color: 'black'
        }} radius={100}/>

            </react_leaflet_1.MapContainer>

        </div>);
};
function LocationMarker() {
    const [position, setPosition] = (0, react_1.useState)(null);
    const map = (0, react_leaflet_1.useMapEvents)({
        click() {
            map.locate();
        },
        locationfound(e) {
            setPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
        },
    });
    return position === null ? null : (<react_leaflet_1.Marker position={position}>
            <react_leaflet_1.Popup>You are here</react_leaflet_1.Popup>
        </react_leaflet_1.Marker>);
}
exports.default = MapLayout;
