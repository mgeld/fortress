"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_leaflet_1 = require("react-leaflet");
const use_hit_fire_pointer_1 = require("../../hooks/use-hit-fire-pointer");
require("./styles.css");
const Drone = ({ health, pos, size, }) => {
    const { fireHitTarget } = (0, use_hit_fire_pointer_1.useHitFirePointer)(health);
    const p = size * 3.14 / 3;
    const a = p * 0.6;
    const b = p * 0.4;
    const dashArrayDroneCircle = `${a} ${b}`;
    const weightDroneCircle = Math.ceil(p / 5);
    const colorDroneCircle = fireHitTarget || health < 1 ? 'red' : '#7a29cc';
    return (<>
            {<react_leaflet_1.Circle center={pos} className={"drone-circle"} pathOptions={{
                dashArray: dashArrayDroneCircle,
                weight: weightDroneCircle,
                fillColor: colorDroneCircle,
                fillOpacity: 0.9,
                opacity: 1,
                color: colorDroneCircle
            }} radius={30}/>}
            <react_leaflet_1.Circle center={pos} className="drone-center" pathOptions={{
            opacity: 0.9,
            color: 'white',
            weight: 2,
            fillColor: '#322a35',
            fillOpacity: 0.5
        }} radius={15}/>
        </>);
};
exports.default = Drone;
