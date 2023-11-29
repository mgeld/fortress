"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_leaflet_1 = require("react-leaflet");
const use_hit_fire_pointer_1 = require("../../hooks/use-hit-fire-pointer");
require("./styles.css");
const Drone = ({ health, pos, size, }) => {
    const { fireHitTarget } = (0, use_hit_fire_pointer_1.useHitFirePointer)(health);
    const p = size * 1.6 * 3.14 / 6;
    const a = p * 0.1;
    const b = p * 0.9;
    const dashArrayDroneCircle = `${a} ${b}`;
    const weightDroneCircle = Math.ceil(p / 4);
    const colorDroneCircle = fireHitTarget || health < 1 ? 'red' : '#393e46';
    return (<>
            {<react_leaflet_1.Circle center={pos} className={"drone-border"} pathOptions={{
                fillColor: colorDroneCircle,
                opacity: 1,
                fillOpacity: 0.9,
                color: colorDroneCircle
            }} radius={30}/>}
            {<react_leaflet_1.Circle center={pos} className={"drone-circle"} pathOptions={{
                dashArray: dashArrayDroneCircle,
                weight: weightDroneCircle,
                fillColor: colorDroneCircle,
                fillOpacity: 0.9,
                opacity: 1,
                lineCap: 'round',
                lineJoin: "miter",
                color: '#ffc536'
            }} radius={24}/>}
            <react_leaflet_1.Circle center={pos} className="drone-center" pathOptions={{
            opacity: 0.9,
            color: '#2a2e33',
            weight: 2,
            fillColor: '#63dafc',
            fillOpacity: 0.9
        }} radius={14}/>
        </>);
};
exports.default = Drone;
