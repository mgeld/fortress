"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDrone = void 0;
const drone_1 = require("entities/pointer/ui/drone");
const ship_1 = require("entities/ship");
const UserDrone = ({ size }) => {
    const pos = ship_1.shipModel.selectors.useShipPos();
    const health = ship_1.shipModel.selectors.useShipHealth();
    return (<drone_1.Ship health={health} pos={pos} size={size}/>);
};
exports.UserDrone = UserDrone;
