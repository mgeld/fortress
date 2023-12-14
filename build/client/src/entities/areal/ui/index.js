"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArealBorder = void 0;
const react_leaflet_1 = require("react-leaflet");
const ArealBorder = ({ areal }) => {
    return (<>
            <react_leaflet_1.Rectangle bounds={[
            [areal[0][0] - 0.01, areal[0][1]],
            [areal[1][0] + 0.01, areal[0][1] - 0.01],
        ]} pathOptions={{
            fillColor: '#473c3c',
            fillOpacity: 0.2,
            stroke: false
        }}/>
            <react_leaflet_1.Rectangle bounds={[
            [areal[1][0], areal[0][1]],
            [areal[1][0] + 0.01, areal[1][1]],
        ]} pathOptions={{
            fillColor: '#473c3c',
            fillOpacity: 0.2,
            stroke: false
        }}/>
            <react_leaflet_1.Rectangle bounds={[
            [areal[0][0] - 0.01, areal[1][1]],
            [areal[1][0] + 0.01, areal[1][1] + 0.01],
        ]} pathOptions={{
            fillColor: '#473c3c',
            fillOpacity: 0.2,
            stroke: false
        }}/>
            <react_leaflet_1.Rectangle bounds={[
            [areal[0][0], areal[0][1]],
            [areal[0][0] - 0.01, areal[1][1]],
        ]} pathOptions={{
            fillColor: '#473c3c',
            fillOpacity: 0.2,
            stroke: false
        }}/>


            
        </>);
};
exports.ArealBorder = ArealBorder;
