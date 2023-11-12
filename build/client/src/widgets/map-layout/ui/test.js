"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Test = void 0;
const react_1 = require("react");
const react_leaflet_1 = require("react-leaflet");
const h3_js_1 = require("h3-js");
const getDestination_1 = require("entities/sector/lib/getDestination");
const getImageBoundsForIndexH3 = (indexh3) => {
    const [lat, lng] = (0, h3_js_1.cellToLatLng)(indexh3);
    const length_m = (0, h3_js_1.getHexagonEdgeLengthAvg)(8, h3_js_1.UNITS.m) / 2;
    const length_degs = (0, h3_js_1.radsToDegs)((0, h3_js_1.edgeLength)((0, h3_js_1.originToDirectedEdges)(indexh3)[1], h3_js_1.UNITS.rads));
    const [lat_1, long_1] = (0, getDestination_1.getDestination)(lat, lng, length_m, 315);
    const [lat_2, long_2] = (0, getDestination_1.getDestination)(lat, lng, length_m, 135);
    let imageBounds = [
        [lat_1 + (length_degs / 4), long_1 + length_degs / 2],
        [lat_2 + (length_degs / 4), long_2 + length_degs / 2]
    ];
    return imageBounds;
};
function Test() {
    const [sectors, setSectors] = (0, react_1.useState)([]);
    const [h3Indexes, setH3Indexes] = (0, react_1.useState)([]);
    const __ = (0, react_leaflet_1.useMapEvent)('move', (e) => {
        console.log('_________________________');
    });
    const map = (0, react_leaflet_1.useMapEvent)('click', (e) => {
        const __start = +new Date();
        const h3Index = (0, h3_js_1.latLngToCell)(e.latlng.lat, e.latlng.lng, 9);
        console.log('getHexagonAreaAvg 8', (0, h3_js_1.getHexagonAreaAvg)(8, h3_js_1.UNITS.m2));
        console.log('getHexagonAreaAvg 9', (0, h3_js_1.getHexagonAreaAvg)(9, h3_js_1.UNITS.m2));
        const hexCenterCoordinates = (0, h3_js_1.cellToLatLng)(h3Index);
        console.log('h3Index', h3Index);
        const hexBoundary = (0, h3_js_1.cellToBoundary)(h3Index);
        console.log('hexBoundary', hexBoundary);
        setSectors(prev => ([...prev, hexBoundary]));
        if (h3Indexes.findIndex((item) => item === h3Index) !== -1)
            return;
        setH3Indexes(prev => ([...prev, h3Index]));
        console.log('Test TIME: ', +new Date() - __start);
    });
    return <>
        <react_leaflet_1.Polygon weight={0.9} fillColor="#ff1c1c" pathOptions={{
            fillColor: 'red',
            color: 'red'
        }} positions={(0, h3_js_1.cellsToMultiPolygon)(h3Indexes)}/>
        
    </>;
    return (<>
        {sectors.map(sect => (<react_leaflet_1.Polygon weight={0.9} color="#ff1c1c" fillColor="#2387d800" positions={sect}/>))}

    </>);
}
exports.Test = Test;
