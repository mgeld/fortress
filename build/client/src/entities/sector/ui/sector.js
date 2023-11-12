"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sectors = void 0;
const h3_js_1 = require("h3-js");
const react_leaflet_1 = require("react-leaflet");
const about_sector_1 = require("./about-sector");
const colors = {
    1: '#b670d1',
    2: '#b670d1',
    3: '#b670d1',
    4: '#b670d1',
    5: '#b670d1',
    6: '#b670d1',
};
const Sectors = ({ zones }) => {
    return <>
        {zones.map(zoneItem => {
            console.log('zoneItem.zone.color', zoneItem.zone.color);
            return (<react_leaflet_1.Polygon key={zoneItem.zone.zone_id} weight={0.9} pathOptions={{
                    fillColor: colors[zoneItem.zone.color],
                    color: colors[zoneItem.zone.color],
                }} positions={(0, h3_js_1.cellsToMultiPolygon)(zoneItem.sectors)}>
                    <react_leaflet_1.Pane name={`popup_${zoneItem.zone.zone_id}`} style={{ zIndex: 3006 }}>
                        <react_leaflet_1.Popup key={`${zoneItem.zone.zone_id}`} closeButton={false} maxWidth={200} minWidth={200} keepInView={true}>
                            <about_sector_1.AboutSector {...zoneItem.zone}/>
                        </react_leaflet_1.Popup>
                    </react_leaflet_1.Pane>
                </react_leaflet_1.Polygon>);
        })}
    </>;
};
exports.Sectors = Sectors;
