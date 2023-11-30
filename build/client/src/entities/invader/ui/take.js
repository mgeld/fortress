"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Take = void 0;
const react_1 = require("react");
const react_leaflet_1 = require("react-leaflet");
const randomNumber_1 = require("shared/lib/randomNumber");
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const getDestination_1 = require("entities/sector/lib/getDestination");
const Take = ({ take, sizeInvader }) => {
    const sizeDrone = 30;
    const toPosLatLng = (0, getDestination_1.getDestination)(take.from_pos[0], take.from_pos[1], sizeDrone / 2, 90);
    const aa = Math.round((toPosLatLng[1] - take.from_pos[1]) * 100000);
    const [pos, setTakePos] = (0, react_1.useState)([
        take.from_pos[0] + ((0, randomNumber_1.randomNumber)(-(aa), aa) / 100000),
        take.from_pos[1] + ((0, randomNumber_1.randomNumber)(-(aa), aa) / 100000)
    ]);
    (0, react_1.useEffect)(() => {
        setTimeout(() => setTakePos(take.to_pos), 50);
    }, [take.to_pos]);
    const p = sizeInvader * 3.14 / 3;
    const a = p * 0.2;
    const b = p * 0.8;
    const weightDroneCircle = Math.ceil(p / 4);
    return (<>
            <react_leaflet_1.Circle center={pos} className={`${styles_module_scss_1.default.__invader} ${take.id}`} pathOptions={{
            dashArray: `${a} ${b}`,
            weight: weightDroneCircle,
            fillColor: '#fa3226',
            fillOpacity: 0.7,
            color: '#3c505a',
        }} radius={12}/>
        </>);
};
exports.Take = Take;
