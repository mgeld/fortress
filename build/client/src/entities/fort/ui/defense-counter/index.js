"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_leaflet_1 = require("react-leaflet");
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const Y_BACK = 37;
const X_BACK = 50;
const DefenseCounter = ({ fort, status, defenders, invaders }) => {
    const map = (0, react_leaflet_1.useMap)();
    const [coords, setCoords] = (0, react_1.useState)(map.latLngToLayerPoint(fort));
    (0, react_1.useEffect)(() => {
        setCoords(map.latLngToLayerPoint(fort));
    }, [map, fort]);
    const __ = (0, react_leaflet_1.useMapEvents)({
        zoomend: () => setCoords(map.latLngToLayerPoint(fort)),
    });
    const p100 = (defenders + invaders);
    const pDefenders = defenders * 100 / p100;
    const pInvaders = invaders * 100 / p100;
    return (<div className={styles_module_scss_1.default.defenseCounter} style={{
            top: `${coords.y - (0) - Y_BACK}px`,
            left: `${coords.x - X_BACK}px`,
        }}>
            {defenders > 0 ? <div className={styles_module_scss_1.default.__defenders} style={{
                width: `${pDefenders}%`
            }}>
                <div className={styles_module_scss_1.default.__count}>
                    <span>{defenders}</span>
                </div>
            </div> : null}
            {invaders > 0 ? <div className={styles_module_scss_1.default.__invaders} style={{
                width: `${pInvaders}%`
            }}>
                <div className={styles_module_scss_1.default.__count}>
                    <span>{invaders}</span>
                </div>
            </div> : null}
            <div className={styles_module_scss_1.default.__whiteEffect}><div /></div>
        </div>);
};
exports.default = DefenseCounter;
