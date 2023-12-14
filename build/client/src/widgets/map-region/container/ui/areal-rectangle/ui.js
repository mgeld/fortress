"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArealRectangle = void 0;
const ui_1 = require("entities/areal/ui");
const ship_1 = require("entities/ship");
const ArealRectangle = () => {
    const areal = ship_1.shipModel.selectors.useAreal();
    if (!areal)
        return null;
    return (<ui_1.ArealBorder areal={areal}/>);
};
exports.ArealRectangle = ArealRectangle;
