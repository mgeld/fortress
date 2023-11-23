"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fort = void 0;
const react_leaflet_1 = require("react-leaflet");
require("./styles.css");
const fort_1 = require("entities/fort");
const Fort = ({ pos }) => {
    return (<react_leaflet_1.FeatureGroup eventHandlers={{
            click: () => {
                fort_1.fortModel.events.setFort(pos);
                setTimeout(() => {
                    fort_1.fortModel.events.setFort(null);
                }, 3000);
            }
        }}>
            <react_leaflet_1.Circle key={'ff1' + pos[0]} className={`fort black-fort`} center={[
            pos[0] - 0.00010,
            pos[1] - 0.00002
        ]} pathOptions={{
            fillColor: '#9F9BA8',
            fillOpacity: 1,
            stroke: false,
        }} radius={30}/>
            <react_leaflet_1.Circle key={'ff2' + pos[0]} className={`fort fort-stroke`} center={pos} pathOptions={{
            fillColor: '#ffffff',
            fillOpacity: 1,
            stroke: false,
        }} radius={30}/>
            <react_leaflet_1.Circle key={'ff3' + pos[0]} className={`fort fort-fill`} center={pos} pathOptions={{
            fillColor: '#D9D9D9',
            fillOpacity: 1,
            stroke: false,
        }} radius={26}/>
        </react_leaflet_1.FeatureGroup>);
};
exports.Fort = Fort;
