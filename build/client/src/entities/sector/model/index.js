"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectors = void 0;
const effector_1 = require("effector");
const effector_react_1 = require("effector-react");
const events_1 = require("shared/api/events");
const { addSector, delSectorById, setSectors, setSectorById, setAboutSector } = events_1.sectorsAPI.events;
const DEFAULT_STORE = [];
const $sectorsStore = (0, effector_1.createStore)(DEFAULT_STORE)
    .on(setSectors, (_, sectors) => sectors)
    .on(addSector, (sectors, sector) => {
    if (sectors.findIndex(zone => zone.zone.zone_id === sector.zone_id) === -1) {
        sectors.push({
            zone: {
                zone_id: sector.zone_id,
                name: '',
                color: 1
            },
            sectors: []
        });
    }
    return sectors.map(zoneItem => zoneItem.zone.zone_id === sector.zone_id ? Object.assign(Object.assign({}, zoneItem), { sectors: [...zoneItem.sectors, sector.sector] }) : zoneItem);
})
    .on(delSectorById, (sectors, sector) => sectors.map(zoneItem => {
    return zoneItem.zone.zone_id === sector.zone_id ? Object.assign(Object.assign({}, zoneItem), { sectors: zoneItem.sectors.filter(sector_index => {
            if (sector_index === sector.sector) {
                return false;
            }
            return true;
        }) }) : zoneItem;
}))
    .on(setSectorById, (sectors, sector) => {
    if (sectors.findIndex(zone => zone.zone.zone_id === sector.new_zone_id) === -1) {
        sectors.push({
            zone: {
                zone_id: sector.new_zone_id,
                name: '',
                color: 1
            },
            sectors: []
        });
    }
    return sectors.map(zoneItem => {
        return zoneItem.zone.zone_id === sector.prev_zone_id ? Object.assign(Object.assign({}, zoneItem), { sectors: zoneItem.sectors.filter(sector_index => {
                if (sector_index === sector.sector) {
                    return false;
                }
                return true;
            }) }) : zoneItem.zone.zone_id === sector.new_zone_id ? Object.assign(Object.assign({}, zoneItem), { sectors: [...zoneItem.sectors, sector.sector] }) : zoneItem;
    });
});
const $sectorAboutStore = (0, effector_1.createStore)(null)
    .on(setAboutSector, (_, sector) => sector);
const useSector = () => {
    return {
        zones: (0, effector_react_1.useStore)($sectorsStore)
    };
};
const useAboutSector = () => {
    return {
        sector: (0, effector_react_1.useStore)($sectorAboutStore)
    };
};
exports.selectors = {
    useSector,
    useAboutSector
};
