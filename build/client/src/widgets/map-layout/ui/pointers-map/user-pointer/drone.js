"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDrone = void 0;
const drone_1 = __importDefault(require("entities/pointer/ui/drone"));
const ship_1 = require("entities/ship");
const UserDrone = ({ size }) => {
    const pos = ship_1.shipModel.selectors.useShipPos();
    const health = ship_1.shipModel.selectors.useShipHealth();
    return (<drone_1.default health={health} pos={pos} size={size}/>);
};
exports.UserDrone = UserDrone;
