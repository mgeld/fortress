"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArealRectangle = void 0;
const ship_1 = require("entities/ship");
const react_leaflet_1 = require("react-leaflet");
const ArealRectangle = () => {
    const areal = ship_1.shipModel.selectors.useAreal();
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
exports.ArealRectangle = ArealRectangle;
