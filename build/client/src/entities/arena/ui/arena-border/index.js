"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArenaBorder = void 0;
const react_leaflet_1 = require("react-leaflet");
const ArenaBorder = ({ bounds: areal }) => {
    if (!areal)
        return null;
    return (<>
            <react_leaflet_1.Rectangle bounds={[
            [areal[0][0] - 0.1, areal[0][1]],
            [areal[1][0] + 0.1, areal[0][1] - 0.1],
        ]} pathOptions={{
            fillColor: '#db5e5e',
            fillOpacity: 0.2,
            stroke: false
        }}/>
            <react_leaflet_1.Rectangle bounds={[
            [areal[1][0], areal[0][1]],
            [areal[1][0] + 0.1, areal[1][1]],
        ]} pathOptions={{
            fillColor: '#db5e5e',
            fillOpacity: 0.2,
            stroke: false
        }}/>
            <react_leaflet_1.Rectangle bounds={[
            [areal[0][0] - 0.1, areal[1][1]],
            [areal[1][0] + 0.1, areal[1][1] + 0.1],
        ]} pathOptions={{
            fillColor: '#db5e5e',
            fillOpacity: 0.2,
            stroke: false
        }}/>
            <react_leaflet_1.Rectangle bounds={[
            [areal[0][0], areal[0][1]],
            [areal[0][0] - 0.1, areal[1][1]],
        ]} pathOptions={{
            fillColor: '#db5e5e',
            fillOpacity: 0.2,
            stroke: false
        }}/>


            
        </>);
};
exports.ArenaBorder = ArenaBorder;
