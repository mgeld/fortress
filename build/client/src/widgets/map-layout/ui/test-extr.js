"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestExtr = void 0;
const ship_1 = require("entities/ship");
const h3_js_1 = require("h3-js");
const react_leaflet_1 = require("react-leaflet");
const TestExtr = () => {
    const areal = ship_1.shipModel.selectors.useAreal();
    const polygon = areal && (areal === null || areal === void 0 ? void 0 : areal.length) > 1 ? [
        [areal[0][0], areal[0][1]],
        [areal[0][0] + 0.02, areal[0][1]],
        [areal[1][0], areal[1][1]],
        [areal[0][0], areal[0][1] + 0.03],
    ] : [];
    const polygs = (0, h3_js_1.polygonToCells)(polygon, 9);
    const p = [];
    polygs.map(item => {
        const pos = (0, h3_js_1.cellToLatLng)(item);
        const r = Math.ceil(+pos[0].toString().slice(-1) +
            +pos[1].toString().slice(-1));
        if (r === 10) {
            p.push((0, h3_js_1.cellToBoundary)(item));
        }
    });
    return (<>
            
            <react_leaflet_1.Polygon weight={0.9} pathOptions={{
            fill: false,
            color: '#e9c564'
        }} positions={p}/>
        </>);
};
exports.TestExtr = TestExtr;
