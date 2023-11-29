"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_leaflet_1 = require("react-leaflet");
const use_hit_fire_pointer_1 = require("../../hooks/use-hit-fire-pointer");
const _icons_1 = require("shared/assets/icons/_icons");
require("./styles.css");
const DroneIOS = ({ health, pos, size, }) => {
    const { fireHitTarget } = (0, use_hit_fire_pointer_1.useHitFirePointer)(health);
    const map = (0, react_leaflet_1.useMap)();
    const [point, setPoint] = (0, react_1.useState)(map.latLngToLayerPoint(pos));
    (0, react_1.useEffect)(() => {
        setPoint(map.latLngToLayerPoint(pos));
    }, [pos, map]);
    (0, react_leaflet_1.useMapEvent)('zoom', (e) => {
        setPoint(map.latLngToLayerPoint(pos));
    });
    size = size * 2;
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
