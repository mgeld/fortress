"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapDrones = void 0;
const react_leaflet_1 = require("react-leaflet");
const drone_1 = require("../user-pointer/drone");
const drones_1 = require("../pointers/drones");
const pointer_1 = require("entities/pointer");
const popout_root_1 = require("shared/ui/popout-root");
const MapDrones = () => {
    const map = (0, react_leaflet_1.useMap)();
    const size = pointer_1.droneMapModel.selectors.useDroneSize().px;
    (0, react_leaflet_1.useMapEvents)({
        zoomstart: () => {
            var _a;
            (_a = map.getPane('zoom-anim-map')) === null || _a === void 0 ? void 0 : _a.setAttribute('class', 'zoom-anim-map');
        },
        zoomend: () => {
            setTimeout(() => {
                var _a;
                (_a = map.getPane('zoom-anim-map')) === null || _a === void 0 ? void 0 : _a.setAttribute('class', 'zoom-anim');
            }, 300);
        },
        zoom: () => {
            pointer_1.droneMapModel.events.setSizeDrone();
        },
    });
    console.log('MapDrones');
    const onShip = () => {
        popout_root_1.popoutModel.events.setPopout('ship');
    };
    return (<react_leaflet_1.Pane name={`drones`} style={{ zIndex: 3001 }}>
            <react_leaflet_1.FeatureGroup eventHandlers={{
            click: onShip
        }}>

                <drone_1.UserDrone size={size}/>
            </react_leaflet_1.FeatureGroup>
            <drones_1.Drones size={size}/>
        </react_leaflet_1.Pane>);
};
exports.MapDrones = MapDrones;
