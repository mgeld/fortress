"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestExtr = void 0;
const ship_1 = require("entities/ship");
const h3_js_1 = require("h3-js");
const react_leaflet_1 = require("react-leaflet");
const TestExtr = () => {
    const polygon = [
        [55.88686527264868, 37.42767333984376],
        [55.89533634081859, 37.85064697265626],
        [55.59231544773266, 37.8424072265625],
        [55.60472974085067, 37.22717285156251]
    ];
    const areal = ship_1.shipModel.selectors.useAreal();
    console.log('areal areal polygon', polygon);
    const polygs = (0, h3_js_1.polygonToCells)(polygon, 9);
    const p = [];
    let sec = 0;
    let is_sec = 0;
    polygs.map(item => {
        const pos = (0, h3_js_1.cellToLatLng)(item);
        sec++;
        const r = Math.ceil((+pos[0].toString().slice(-1) + +pos[1].toString().slice(-1)));
        if (r <= 6) {
            is_sec++;
            p.push((0, h3_js_1.cellToBoundary)(item));
        }
    });
    const map = (0, react_leaflet_1.useMapEvent)('click', (e) => {
        const h3Index = (0, h3_js_1.latLngToCell)(e.latlng.lat, e.latlng.lng, 9);
        console.log('e.latlng.lat, e.latlng.lng', e.latlng.lat, e.latlng.lng);
    });
    return (<>
            
            <react_leaflet_1.Polygon weight={0.9} pathOptions={{
            fillOpacity: 0,
            color: '#e9c564'
        }} positions={p}/>
        </>);
};
exports.TestExtr = TestExtr;
