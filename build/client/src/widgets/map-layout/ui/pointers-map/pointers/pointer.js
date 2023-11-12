"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const point_icon_1 = require("entities/pointer/ui/point-icon");
const health_1 = __importDefault(require("entities/pointer/ui/health"));
const Pointer = ({ pointer }) => {
    if (pointer.health < 1)
        return <></>;
    return (<>
            <health_1.default lvl={pointer.lvl} position={pointer.pos} health={pointer.health}/>
            <point_icon_1.PointIcon position={pointer.pos} userIcon={pointer.icon || ''} userName={pointer.name || ''}/>
        </>);
};
exports.default = Pointer;
