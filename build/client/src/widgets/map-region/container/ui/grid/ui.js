"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridMap = void 0;
const map_1 = require("entities/map");
const grid_1 = require("entities/map/ui/grid");
const react_leaflet_1 = require("react-leaflet");
const GridMap = ({ pos }) => {
    const isGrid = map_1.mapModel.selectors.useMapGrid();
    (0, react_leaflet_1.useMapEvent)('dblclick', (e) => {
        map_1.mapModel.events.setMapGrid();
    });
    if (!isGrid)
        return <></>;
    return (<grid_1.Grid pos={pos}/>);
};
exports.GridMap = GridMap;
