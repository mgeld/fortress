"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointerDrone = void 0;
const drone_1 = __importDefault(require("entities/pointer/ui/drone"));
const PointerDrone = ({ size, health, pos }) => {
    return (<drone_1.default health={health} pos={pos} size={size}/>);
};
exports.PointerDrone = PointerDrone;
