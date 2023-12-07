"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_leaflet_1 = require("react-leaflet");
const use_hit_fire_pointer_1 = require("../../hooks/use-hit-fire-pointer");
const _icons_1 = require("shared/assets/icons/_icons");
const metersToPx_1 = require("shared/lib/metersToPx");
require("./styles.css");
const DroneIOS = ({ health, pos, }) => {
    const { fireHitTarget } = (0, use_hit_fire_pointer_1.useHitFirePointer)(health);
    const map = (0, react_leaflet_1.useMap)();
    const [size, setZise] = (0, react_1.useState)((0, metersToPx_1.metersToPx)(map.getCenter().lat, 60, map.getZoom()));
    const [point, setPoint] = (0, react_1.useState)(map.latLngToLayerPoint(pos));
    (0, react_1.useEffect)(() => {
        setPoint(map.latLngToLayerPoint(pos));
    }, [pos, map]);
    (0, react_leaflet_1.useMapEvent)('zoom', (e) => {
        setPoint(map.latLngToLayerPoint(pos));
        setZise((0, metersToPx_1.metersToPx)(pos[0], 60, map.getZoom()));
    });
    const colorDroneCircle = fireHitTarget || health < 1 ? 'red' : '#393e46';
    return (<>
            <div className="drone-div" style={{
            top: `${point.y}px`,
            left: `${point.x}px`,
            width: `${size}px`,
            height: `${size}px`,
            marginTop: `-${(size / 2)}px`,
            marginLeft: `-${(size / 2)}px`,
        }}>
                <_icons_1.IconShip width={size} height={size} fill={colorDroneCircle}/>
                
            </div>
            
            
        </>);
};
exports.default = DroneIOS;
