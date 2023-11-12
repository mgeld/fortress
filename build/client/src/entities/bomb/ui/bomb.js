"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bomb = void 0;
const react_1 = require("react");
const react_leaflet_1 = require("react-leaflet");
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const Bomb = ({ bomb }) => {
    const [radius, setRadius] = (0, react_1.useState)(1);
    (0, react_1.useEffect)(() => {
        setTimeout(() => setRadius(bomb.radius), 50);
    }, [bomb.radius]);
    return (<react_leaflet_1.Circle center={bomb.pos} className={`${styles_module_scss_1.default.__bomb}`} pathOptions={{
            fillColor: 'red',
            stroke: false,
            fillOpacity: 0.5
        }} radius={radius}/>);
};
exports.Bomb = Bomb;
