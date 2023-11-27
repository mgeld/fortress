"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPointer = void 0;
const pointer_creator_1 = require("./pointer-creator");
const _3pointer_png_1 = __importDefault(require("../assets/icons/3pointer.png"));
const createPointer = (usericon) => {
    return new pointer_creator_1.PointerCreator().createPoint(_3pointer_png_1.default, usericon);
};
exports.createPointer = createPointer;
