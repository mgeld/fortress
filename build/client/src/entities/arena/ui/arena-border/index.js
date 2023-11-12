"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArenaBorder = void 0;
const react_1 = require("react");
const react_leaflet_1 = require("react-leaflet");
const ArenaBorder = ({ bounds: areal }) => {
    const map = (0, react_leaflet_1.useMap)();
    (0, react_1.useEffect)(() => {
        if (areal) {
            setTimeout(() => map.setMaxBounds([
                [areal[0][0] - 0.01, areal[0][1] - 0.01],
                [areal[1][0] + 0.01, areal[1][1] + 0.01],
            ]), 2000);
        }
    }, [map, areal]);
    if (!areal)
        return null;
    return (<>
            <react_leaflet_1.Rectangle bounds={[
            [areal[0][0] - 0.01, areal[0][1]],
            [areal[1][0] + 0.01, areal[0][1] - 0.01],
        ]} pathOptions={{
            fillColor: '#db5e5e',
            fillOpacity: 0.2,
            stroke: false
        }}/>
            <react_leaflet_1.Rectangle bounds={[
            [areal[1][0], areal[0][1]],
            [areal[1][0] + 0.01, areal[1][1]],
        ]} pathOptions={{
            fillColor: '#db5e5e',
            fillOpacity: 0.2,
            stroke: false
        }}/>
            <react_leaflet_1.Rectangle bounds={[
            [areal[0][0] - 0.01, areal[1][1]],
            [areal[1][0] + 0.01, areal[1][1] + 0.01],
        ]} pathOptions={{
            fillColor: '#db5e5e',
            fillOpacity: 0.2,
            stroke: false
        }}/>
            <react_leaflet_1.Rectangle bounds={[
            [areal[0][0], areal[0][1]],
            [areal[0][0] - 0.01, areal[1][1]],
        ]} pathOptions={{
            fillColor: '#db5e5e',
            fillOpacity: 0.2,
            stroke: false
        }}/>


            
        </>);
};
exports.ArenaBorder = ArenaBorder;
