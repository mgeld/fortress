"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectorsMap = void 0;
const map_1 = require("entities/map");
const sector_1 = require("entities/sector");
const react_leaflet_1 = require("react-leaflet");
const sector_2 = require("entities/sector");
const SectorsMap = () => {
    const sectors = sector_2.sectorMapModel.selectors.useSector();
    console.log('SectorsMap sectors', sectors);
    (0, react_leaflet_1.useMapEvents)({
        popupopen(e) {
            const latlng = e.popup.getLatLng();
            if (latlng)
                map_1.mapModel.events.setLatLngMap([latlng === null || latlng === void 0 ? void 0 : latlng.lat, latlng === null || latlng === void 0 ? void 0 : latlng.lng]);
        }
    });
    return <>
        {sectors.zones.map(zoneItem => {
            let color = zoneItem.zone.zone_id === -1 ? 0 : zoneItem.zone.color;
            return (<sector_1.Sectors key={zoneItem.zone.zone_id} zoneItem={zoneItem} color={color} fillOpacity={0.6}/>);
        })}
    </>;
};
exports.SectorsMap = SectorsMap;
