"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const point_icon_1 = require("entities/pointer/ui/point-icon");
const health_1 = __importDefault(require("entities/pointer/ui/health"));
const name_1 = __importDefault(require("entities/pointer/ui/name"));
const Pointer = ({ pointer }) => {
    return (<>
            <health_1.default lvl={pointer.lvl} position={pointer.pos} health={pointer.health}/>
            <name_1.default position={pointer.pos} name={(pointer === null || pointer === void 0 ? void 0 : pointer.name) || 'Аноним'}/>
            <point_icon_1.PointIcon position={pointer.pos} userIcon={pointer.icon || ''}/>
        </>);
};
exports.default = Pointer;
