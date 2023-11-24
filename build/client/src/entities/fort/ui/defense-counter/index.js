"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_leaflet_1 = require("react-leaflet");
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const user_1 = require("entities/user");
const map_1 = require("entities/map");
const arena_1 = require("entities/arena");
const Y_BACK = 37;
const X_BACK = 50;
const DefenseCounter = ({ fort, status, defenders, invaders, owner }) => {
    const map = (0, react_leaflet_1.useMap)();
    const [coords, setCoords] = (0, react_1.useState)(map.latLngToLayerPoint(fort));
    const myId = map_1.mapModel.selectors.useMapMode().mode === 'invade' ?
        user_1.userModel.selectors.useUserId() :
        arena_1.arenaModel.selectors.useMyTeamId().data;
    (0, react_1.useEffect)(() => {
        setCoords(map.latLngToLayerPoint(fort));
    }, [map, fort]);
    const __ = (0, react_leaflet_1.useMapEvents)({
        zoomend: () => setCoords(map.latLngToLayerPoint(fort)),
    });
    const p100 = (defenders + invaders);
    const pDefenders = defenders * 100 / p100;
    const pInvaders = invaders * 100 / p100;
    const styleI = myId !== owner ? styles_module_scss_1.default.__green : styles_module_scss_1.default.__red;
    const styleD = myId !== owner ? styles_module_scss_1.default.__red : styles_module_scss_1.default.__green;
    return (<div className={styles_module_scss_1.default.defenseCounter} style={{
            top: `${coords.y - (0) - Y_BACK}px`,
            left: `${coords.x - X_BACK}px`,
        }}>

            {defenders > 0 ? <div className={styleD} style={{
                width: `${pDefenders}%`
            }}>
                <div className={styles_module_scss_1.default.__count}>
                    <span>{defenders}</span>
                </div>
            </div> : null}

            {invaders > 0 ? <div className={styleI} style={{
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
