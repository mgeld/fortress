"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_leaflet_1 = require("react-leaflet");
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const Y_BACK = 64 + 9;
const X_BACK = 0;
const Name = ({ position, name }) => {
    const map = (0, react_leaflet_1.useMap)();
    console.log('>>>>>>>>> Name position', position);
    console.log('>>>>>>>>> Name health', name);
    const [coords, setCoords] = (0, react_1.useState)(map.latLngToLayerPoint(position));
    (0, react_1.useEffect)(() => {
        setCoords(map.latLngToLayerPoint(position));
    }, [map, position]);
    const __ = (0, react_leaflet_1.useMapEvents)({
        zoomend: () => setCoords(map.latLngToLayerPoint(position)),
    });
    return (<div className={`${styles_module_scss_1.default.markerName} strw1`} style={{
            top: `${coords.y - Y_BACK}px`,
            left: `${coords.x - X_BACK}px`,
        }}>
            <div className={styles_module_scss_1.default.__name}>
                {name}
            </div>
        </div>);
};
exports.default = Name;
