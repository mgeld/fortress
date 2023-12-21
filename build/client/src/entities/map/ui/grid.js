"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grid = void 0;
const h3_js_1 = require("h3-js");
const react_leaflet_1 = require("react-leaflet");
const Grid = ({ pos }) => {
    const disk = (0, h3_js_1.gridRingUnsafe)((0, h3_js_1.latLngToCell)(pos[0], pos[1], 9), 1);
    const disk2 = (0, h3_js_1.gridRingUnsafe)((0, h3_js_1.latLngToCell)(pos[0], pos[1], 9), 3);
    return (<react_leaflet_1.Polygon weight={0.9} pathOptions={{
            fill: false,
            color: '#994cff',
            weight: 1
        }} positions={(0, h3_js_1.cellsToMultiPolygon)([...disk, ...disk2])}></react_leaflet_1.Polygon>);
};
exports.Grid = Grid;
