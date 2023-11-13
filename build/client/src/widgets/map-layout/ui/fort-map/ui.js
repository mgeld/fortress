"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FortMap = void 0;
const fort_1 = require("entities/fort");
const ui_1 = require("entities/fort/ui/attack-fort/ui");
const ship_1 = require("entities/ship");
const h3_js_1 = require("h3-js");
const react_leaflet_1 = require("react-leaflet");
const FortMap = () => {
    const pos = ship_1.shipModel.selectors.useShipPos();
    const h3Index = (0, h3_js_1.latLngToCell)(pos[0], pos[1], 9);
    const hexCenterCoordinates = (0, h3_js_1.cellToLatLng)(h3Index);
    return (<>
            <react_leaflet_1.Pane name="q" style={{ zIndex: 3001 }}>
                <fort_1.Fort pos={hexCenterCoordinates}/>
            </react_leaflet_1.Pane>
            <react_leaflet_1.Pane name="2" style={{ zIndex: 3000 }}>
                <ui_1.AttackFort pos={hexCenterCoordinates}/>
            </react_leaflet_1.Pane>
        </>);
};
exports.FortMap = FortMap;
