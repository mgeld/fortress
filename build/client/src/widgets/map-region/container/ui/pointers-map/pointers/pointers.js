"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pointers = void 0;
const react_1 = require("react");
const pointer_1 = require("entities/pointer");
const pointer_2 = __importDefault(require("./pointer"));
const Pointers = () => {
    const pointers = pointer_1.pointerMapModel.selectors.usePointers().data;
    const memoPointers = (0, react_1.useMemo)(() => pointers.map(pointer => (<pointer_2.default key={pointer.userId} pointer={pointer}/>)), [pointers]);
    return <>
        {memoPointers}
    </>;
};
exports.Pointers = Pointers;
