"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Citadel = void 0;
const react_leaflet_1 = require("react-leaflet");
const pointer_1 = require("entities/pointer");
require("./styles.css");
const Citadel = ({ pos, _click }) => {
    const size = pointer_1.droneMapModel.selectors.useDroneSize().px * 1.6;
    const p = size * 3.14 / 6;
    const a = p * 0.3;
    const b = p * 0.7;
    const dashArrayDroneCircle = `${a} ${b}`;
    const weightDroneCircle = Math.ceil(p / 4);
    return (<react_leaflet_1.FeatureGroup eventHandlers={{
            click: _click
        }}>
            <react_leaflet_1.Circle key={1} className={`fort black-fort`} center={[
            pos[0] - 0.00010,
            pos[1] - 0.00002
        ]} pathOptions={{
            fillColor: '#9F9BA8',
            fillOpacity: 1,
            stroke: false,
        }} radius={30}/>
            <react_leaflet_1.Circle key={2} className={`fort fort-stroke`} center={pos} pathOptions={{
            fillColor: '#ffffff',
            fillOpacity: 1,
            dashArray: dashArrayDroneCircle,
            weight: weightDroneCircle,
            opacity: 1,
            color: '#ffffff'
        }} radius={30}/>
            <react_leaflet_1.Circle key={3} className={`fort fort-fill`} center={pos} pathOptions={{
            fillColor: '#D9D9D9',
            fillOpacity: 1,
            stroke: false,
        }} radius={26}/>
            <react_leaflet_1.Circle key={4} className={`fort fort-flag`} center={pos} pathOptions={{
            fillColor: '#8d6a6a',
            fillOpacity: 1,
            stroke: true,
            color: 'white'
        }} radius={10}/>
        </react_leaflet_1.FeatureGroup>);
};
exports.Citadel = Citadel;
