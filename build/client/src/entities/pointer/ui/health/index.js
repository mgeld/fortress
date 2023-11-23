"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_leaflet_1 = require("react-leaflet");
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const ship_level_1 = require("entities/ship/lib/ship-level");
const Y_BACK = 64 + 24;
const X_BACK = 32;
const Health = ({ position, lvl, health }) => {
    const map = (0, react_leaflet_1.useMap)();
    console.log('>>>>>>>>> Health position', position);
    console.log('>>>>>>>>> Health health', health);
    const [coords, setCoords] = (0, react_1.useState)(map.latLngToLayerPoint(position));
    (0, react_1.useEffect)(() => {
        setCoords(map.latLngToLayerPoint(position));
    }, [map, position]);
    const __ = (0, react_leaflet_1.useMapEvents)({
        zoomend: () => setCoords(map.latLngToLayerPoint(position)),
    });
    const progressHealth = health * 100 / ship_level_1.ShipLevel.getMaxHealth(lvl);
    return (<div className={styles_module_scss_1.default.markerHealth} style={{
            top: `${coords.y - Y_BACK}px`,
            left: `${coords.x - X_BACK}px`,
        }}>
            <div className={styles_module_scss_1.default.__health} style={{
            width: `${progressHealth}%`,
            backgroundColor: '#3FF672'
        }}/>
            <div className={styles_module_scss_1.default.__whiteEffect}><div /></div>
            <div className={styles_module_scss_1.default.__count}>
                {health}
            </div>
        </div>);
};
exports.default = Health;
