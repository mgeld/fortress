"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FortMap = void 0;
const fort_1 = require("entities/fort");
const ship_1 = require("entities/ship");
const FortMap = () => {
    const pos = ship_1.shipModel.selectors.useShipPos();
    return (<fort_1.Fort pos={pos}/>);
};
exports.FortMap = FortMap;
