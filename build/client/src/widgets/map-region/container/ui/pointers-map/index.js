"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointersMap = void 0;
const react_leaflet_1 = require("react-leaflet");
const pointers_1 = require("./pointers/pointers");
const point_1 = require("./user-pointer/point");
const map_drones_1 = require("./map-drones");
const PointersMap = () => {
    return <>
        <react_leaflet_1.Pane name="pointers" style={{ zIndex: 3002 }}>
            <point_1.UserPoint />
            <pointers_1.Pointers />
        </react_leaflet_1.Pane>

        <map_drones_1.MapDrones />
    </>;
};
exports.PointersMap = PointersMap;
