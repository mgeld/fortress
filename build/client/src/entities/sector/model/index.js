"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectors = void 0;
const effector_1 = require("effector");
const effector_react_1 = require("effector-react");
const model_1 = require("entities/areal/model");
const ship_1 = require("entities/ship");
const events_1 = require("shared/api/events");
const { addSector, delSectorById, setSectors, setSectorById, setAboutSector, setZoneColor, addZoneAreal, addSectors } = events_1.sectorsAPI.events;
const DEFAULT_STORE = [];
const $sectorsStore = (0, effector_1.createStore)(DEFAULT_STORE)
    .on(setSectors, (_, sectors) => sectors)
    .on(addSector, (sectors, sector) => {
    if (sectors.findIndex(zone => zone.zone.zone_id === sector.zone_id) === -1) {
        sectors.push({
            zone: {
                zone_id: sector.zone_id,
                color: 1
            },
            sectors: {}
        });
    }
    return sectors.map(zoneItem => zoneItem.zone.zone_id === sector.zone_id ? Object.assign(Object.assign({}, zoneItem), { sectors: Object.assign(Object.assign({}, zoneItem.sectors), { [sector.area]: zoneItem.sectors[sector.area] ? [...zoneItem.sectors[sector.area], sector.sector] : [sector.sector] }) }) : zoneItem);
})
    .on(delSectorById, (sectors, sector) => sectors.map(zoneItem => {
    return zoneItem.zone.zone_id === sector.zone_id ? Object.assign(Object.assign({}, zoneItem), { sectors: Object.assign(Object.assign({}, zoneItem.sectors), { [sector.area]: zoneItem.sectors[sector.area].filter(sector_index => {
                if (sector_index === sector.sector) {
                    return false;
                }
                return true;
            }) }) }) : zoneItem;
}))
    .on(setZoneColor, (sectors, setter) => {
    if (sectors.findIndex(zone => zone.zone.zone_id === setter.zone_id) === -1) {
        sectors.push({
            zone: {
                zone_id: setter.zone_id,
                color: setter.color
            },
            sectors: []
        });
    }
    return sectors.map(zoneItem => {
        return zoneItem.zone.zone_id === setter.zone_id ? Object.assign(Object.assign({}, zoneItem), { zone: Object.assign(Object.assign({}, zoneItem.zone), { color: setter.color }) }) : zoneItem;
    });
})
    .on(addZoneAreal, (sectors, new_zone) => {
    if (sectors.findIndex(zone => zone.zone.zone_id === new_zone.zone_id) === -1) {
        sectors.push({
            zone: {
                zone_id: new_zone.zone_id,
                color: new_zone.color
            },
            sectors: {}
        });
    }
    return sectors;
})
    .on(setSectorById, (sectors, setter) => {
    if (sectors.findIndex(zone => zone.zone.zone_id === setter.new_zone_id) === -1) {
        sectors.push({
            zone: {
                zone_id: setter.new_zone_id,
                color: 1
            },
            sectors: {}
        });
    }
    return sectors.map(zoneItem => {
        if (zoneItem.zone.zone_id === setter.prev_zone_id)
            return Object.assign(Object.assign({}, zoneItem), { sectors: Object.assign(Object.assign({}, zoneItem.sectors), { [setter.area]: zoneItem.sectors[setter.area].filter(sect_id => {
                        if (sect_id === setter.sector) {
                            return false;
                        }
                        return true;
                    }) }) });
        if (zoneItem.zone.zone_id === setter.new_zone_id)
            return Object.assign(Object.assign({}, zoneItem), { sectors: Object.assign(Object.assign({}, zoneItem.sectors), { [setter.area]: zoneItem.sectors[setter.area] ? [...zoneItem.sectors[setter.area], setter.sector] : [setter.sector] }) });
        return zoneItem;
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
const addSectorsFx = (0, effector_1.createEffect)(({ source, nSectors }) => {
    const { areal, prevAreal, sectors } = source;
    if (!areal)
        return [];
    let areals = [];
    if (prevAreal) {
        areals = model_1.Areal.getAreals([prevAreal[0][0] + 0.01, prevAreal[0][1] + 0.01]);
        if (areal[0][0] > prevAreal[0][0]) {
            areals = areals.slice(6);
            console.log('TOP');
        }
        if (areal[0][0] < prevAreal[0][0]) {
            areals = areals.slice(0, 3);
            console.log('BOTTOM');
        }
        if (areal[0][1] > prevAreal[0][1]) {
            areals = [areals[0], areals[3], areals[6]];
            console.log('RIGHT');
        }
        if (areal[0][1] < prevAreal[0][1]) {
            areals = [areals[2], areals[5], areals[8]];
            console.log('LEFT');
        }
    }
    const diff = nSectors.slice();
    const __sects = sectors.map(item => {
        if (areals.length > 0)
            areals.forEach(function (k) {
                delete item.sectors[k];
            });
        const findItem = diff.find(zone => zone.zone.zone_id === item.zone.zone_id);
        if (!findItem) {
            return item;
        }
        else {
            diff.splice(diff.findIndex(zone => zone.zone.zone_id === item.zone.zone_id), 1);
            return Object.assign(Object.assign({}, item), { sectors: Object.assign(Object.assign({}, item.sectors), findItem.sectors) });
        }
    });
    return [...__sects, ...diff];
});
(0, effector_1.sample)({
    clock: addSectors,
    source: {
        sectors: $sectorsStore,
        areal: ship_1.shipModel.$arealStore,
        prevAreal: ship_1.shipModel.$prevArealStore,
    },
    fn: (source, nSectors) => ({ source, nSectors }),
    target: addSectorsFx
});
(0, effector_1.sample)({
    clock: addSectorsFx.doneData,
    target: $sectorsStore
});
