"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fort = void 0;
const h3_js_1 = require("h3-js");
const react_leaflet_1 = require("react-leaflet");
require("./styles.css");
const Fort = ({ pos }) => {
    const h3Index = (0, h3_js_1.latLngToCell)(pos[0], pos[1], 9);
    const hexCenterCoordinates = (0, h3_js_1.cellToLatLng)(h3Index);
    return (<>
            <react_leaflet_1.Circle key={1 + h3Index} className={`fort black-fort`} center={[
            hexCenterCoordinates[0] - 0.00010,
            hexCenterCoordinates[1] - 0.00002
        ]} pathOptions={{
            fillColor: '#9F9BA8',
            fillOpacity: 1,
            stroke: false,
        }} radius={30}/>
            <react_leaflet_1.Circle key={2 + h3Index} className={`fort fort-stroke`} center={hexCenterCoordinates} pathOptions={{
            fillColor: '#ffffff',
            fillOpacity: 1,
            stroke: false,
        }} radius={30}/>
            <react_leaflet_1.Circle key={3 + h3Index} className={`fort fort-fill`} center={hexCenterCoordinates} pathOptions={{
            fillColor: '#D9D9D9',
            fillOpacity: 1,
            stroke: false,
        }} radius={26}/>
        </>);
};
exports.Fort = Fort;
