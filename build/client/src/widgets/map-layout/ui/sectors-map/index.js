"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectorsMap = void 0;
const sector_1 = require("entities/sector");
const sector_2 = require("entities/sector");
const react_leaflet_1 = require("react-leaflet");
const map_1 = require("entities/map");
const SectorsMap = () => {
    const sectors = sector_1.sectorMapModel.selectors.useSector();
    console.log('SectorsMap');
    (0, react_leaflet_1.useMapEvents)({
        popupopen(e) {
            const latlng = e.popup.getLatLng();
            if (latlng)
                map_1.mapModel.events.setLatLngMap([latlng === null || latlng === void 0 ? void 0 : latlng.lat, latlng === null || latlng === void 0 ? void 0 : latlng.lng]);
        }
    });
    return <>
        <sector_2.Sectors zones={sectors.zones}/>
    </>;
};
exports.SectorsMap = SectorsMap;
