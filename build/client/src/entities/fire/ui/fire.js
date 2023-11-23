"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fire = void 0;
const react_1 = require("react");
const react_leaflet_1 = require("react-leaflet");
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const fire_limit_1 = require("../lib/fire-limit");
const Fire = ({ fire }) => {
    const [pos, setFirePos] = (0, react_1.useState)(fire.from_pos);
    const map = (0, react_leaflet_1.useMap)();
    const bounds = map.getBounds();
    let { limit_to_pos, time_fire } = (0, fire_limit_1.fireLimit)({
        fire,
        bounds
    });
    const fireClassName = `l${time_fire}`;
    (0, react_1.useEffect)(() => {
        setTimeout(() => setFirePos(limit_to_pos), 50);
    }, [limit_to_pos]);
    return (<>
            <react_leaflet_1.Circle center={pos} className={`${styles_module_scss_1.default.__fire} ${fireClassName}`} pathOptions={{
            fillColor: '#3FF672',
            stroke: false,
            fillOpacity: 1
        }} radius={15}/>
        </>);
};
exports.Fire = Fire;
