"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setMapPosListener = void 0;
const effector_1 = require("effector");
const model_1 = require("entities/areal/model");
const map_1 = require("entities/map");
const pointer_1 = require("entities/pointer");
const ship_1 = require("entities/ship");
const direct_1 = require("shared/api/direct");
const events_1 = require("shared/api/events");
const setPosFx = (0, effector_1.createEffect)(({ source, pos }) => {
    const areal = model_1.Areal.getBounds(pos);
    ship_1.shipModel.events.setAreal(areal);
    pointer_1.droneMapModel.events.setSizeDrone();
    source.map.setView(pos, 16);
    if (source.mode === 'invade') {
        setTimeout(() => (0, direct_1.directAPI)(pos), 200);
    }
});
const setMapPosListener = () => {
    (0, effector_1.sample)({
        clock: events_1.shipAPI.events.setPos,
        source: {
            map: map_1.mapModel.$mapStore,
            mode: map_1.mapModel.$mapMode,
            satellite: map_1.mapSatelliteModel.$satelliteStore
        },
        filter: (source) => source.map !== null && source.satellite === null,
        fn: (source, clock) => ({
            source,
            pos: clock
        }),
        target: setPosFx
    });
};
exports.setMapPosListener = setMapPosListener;
