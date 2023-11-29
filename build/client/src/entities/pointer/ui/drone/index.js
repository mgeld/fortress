"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ship = void 0;
const drone_1 = __importDefault(require("./drone"));
const drone_ios_1 = __importDefault(require("./drone-ios"));
const get_platform_native_1 = require("shared/lib/get-platform-native");
let platform = (0, get_platform_native_1.getPlatformNative)();
const Ship = ({ size, health, pos }) => {
    if (platform === 'iphone')
        return <drone_ios_1.default health={health} pos={pos} size={size}/>;
    return <drone_1.default health={health} pos={pos} size={size}/>;
};
exports.Ship = Ship;
