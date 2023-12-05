"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointerDrone = void 0;
const drone_1 = require("entities/pointer/ui/drone");
const PointerDrone = ({ size, health, pos }) => {
    return (<drone_1.Ship health={health} pos={pos} size={size}/>);
};
exports.PointerDrone = PointerDrone;
