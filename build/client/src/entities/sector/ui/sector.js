"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sectors = void 0;
const h3_js_1 = require("h3-js");
const about_sector_1 = require("./about-sector");
const react_leaflet_1 = require("react-leaflet");
const sector_color_list_1 = require("../lib/sector-color-list");
const Sectors = ({ zoneItem, fillOpacity, color }) => {
    const sectors = Object.values(zoneItem.sectors);
    let combinedAreas = sectors.reduce((acc, curr) => {
        return acc.concat(curr);
    }, []);
    return (<react_leaflet_1.Polygon key={zoneItem.zone.zone_id} weight={0.9} pathOptions={{
            fillOpacity,
            fillColor: sector_color_list_1.sectorColorList[color],
            color: sector_color_list_1.sectorColorList[color],
        }} positions={(0, h3_js_1.cellsToMultiPolygon)(combinedAreas)}>
            <react_leaflet_1.Pane name={`popup_${zoneItem.zone.zone_id}`} style={{ zIndex: 3006 }}>
                <react_leaflet_1.Popup key={`${zoneItem.zone.zone_id}`} closeButton={true} maxWidth={200} minWidth={200} keepInView={false}>
                    <about_sector_1.AboutSector />
                </react_leaflet_1.Popup>
            </react_leaflet_1.Pane>
        </react_leaflet_1.Polygon>);
};
exports.Sectors = Sectors;
