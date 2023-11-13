"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_leaflet_1 = require("react-leaflet");
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const popout_root_1 = require("shared/ui/popout-root");
const Y_BACK = 98;
const X_BACK = 55;
const RecoverDroneButton = ({ position, }) => {
    const map = (0, react_leaflet_1.useMap)();
    const [coords, setCoords] = (0, react_1.useState)(map.latLngToLayerPoint(position));
    (0, react_1.useEffect)(() => {
        setCoords(map.latLngToLayerPoint(position));
    }, [map, position]);
    const __ = (0, react_leaflet_1.useMapEvents)({
        zoomend: () => setCoords(map.latLngToLayerPoint(position)),
    });
    return (<div onClick={() => popout_root_1.popoutModel.events.setPopout('ship-improve-health')} className={styles_module_scss_1.default.recoverDroneButton} style={{
            top: `${coords.y - Y_BACK}px`,
            left: `${coords.x - X_BACK}px`,
        }}>
            <div className={styles_module_scss_1.default.__whiteEffect}><div /></div>
            <div className={styles_module_scss_1.default.__text}>
                Восстановить
            </div>
        </div>);
};
exports.default = RecoverDroneButton;
