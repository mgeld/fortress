"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_leaflet_1 = require("react-leaflet");
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const Y_BACK = 42;
const X_BACK = 15;
const BootyPopup = ({ cont, fort }) => {
    const map = (0, react_leaflet_1.useMap)();
    const [coords, setCoords] = (0, react_1.useState)(map.latLngToLayerPoint(fort));
    (0, react_1.useEffect)(() => {
        setCoords(map.latLngToLayerPoint(fort));
    }, [map, fort]);
    const __ = (0, react_leaflet_1.useMapEvents)({
        zoomend: () => setCoords(map.latLngToLayerPoint(fort)),
    });
    return (<div className={styles_module_scss_1.default.bootyPopup} style={{
            top: `${coords.y - (0) - Y_BACK}px`,
            left: `${coords.x - X_BACK}px`,
        }}>

            <div className={styles_module_scss_1.default.bootyIcon}>
                <img src={"icons/chest.png"} alt="<>"/>
            </div>
            
            
            <div className={styles_module_scss_1.default.__whiteEffect}><div /></div>
        </div>);
};
exports.default = BootyPopup;
