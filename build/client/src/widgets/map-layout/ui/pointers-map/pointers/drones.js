"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Drones = void 0;
const pointer_1 = require("entities/pointer");
const pointer_drone_1 = require("./pointer-drone");
const Drones = ({ size }) => {
    const pointers = pointer_1.pointerMapModel.selectors.usePointers().data;
    return <>
        {pointers.map(pointer => {
            if (pointer.health < 1)
                return null;
            return (<pointer_drone_1.PointerDrone key={pointer.userId} health={pointer.health} pos={pointer.pos} size={size}/>);
        })}
    </>;
};
exports.Drones = Drones;
