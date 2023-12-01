"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sectors = void 0;
const h3_js_1 = require("h3-js");
const react_leaflet_1 = require("react-leaflet");
const about_sector_1 = require("./about-sector");
const colors = {
    1: '#de89ff',
    2: '#ff8686',
    3: '#559ffa',
    4: '#63ce7a',
    5: '#fd7ec8',
    6: '#9d9cff',
};
const Sectors = ({ zones }) => {
    return <>
        {zones.map(zoneItem => {
            let color = zoneItem.zone.zone_id > 2 ? 1 : zoneItem.zone.color;
            return (<react_leaflet_1.Polygon key={zoneItem.zone.zone_id} weight={0.9} pathOptions={{
                    fillColor: colors[color],
                    color: colors[color],
                }} positions={(0, h3_js_1.cellsToMultiPolygon)(zoneItem.sectors)}>
                    <react_leaflet_1.Pane name={`popup_${zoneItem.zone.zone_id}`} style={{ zIndex: 3006 }}>
                        <react_leaflet_1.Popup key={`${zoneItem.zone.zone_id}`} closeButton={false} maxWidth={200} minWidth={200} keepInView={false}>
                            <about_sector_1.AboutSector />
                        </react_leaflet_1.Popup>
                    </react_leaflet_1.Pane>
                </react_leaflet_1.Polygon>);
        })}
    </>;
};
exports.Sectors = Sectors;
