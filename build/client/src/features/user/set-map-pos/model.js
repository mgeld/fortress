"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setMapPosListener = void 0;
const effector_1 = require("effector");
const model_1 = require("entities/areal/model");
const map_1 = require("entities/map");
const ship_1 = require("entities/ship");
const direct_1 = require("shared/api/direct");
const events_1 = require("shared/api/events");
const setPosFx = (0, effector_1.createEffect)(({ source, pos }) => {
    var _a;
    const areal = model_1.Areal.getBounds(pos);
    ship_1.shipModel.events.setAreal(areal);
    source.map.setView(pos, 16);
    source.map.setZoom(16);
    (_a = source.map) === null || _a === void 0 ? void 0 : _a.setMinZoom(15);
    if (source.mode === 'invade')
        setTimeout(() => (0, direct_1.directAPI)(pos), 200);
});
const setMapPosListener = () => {
    (0, effector_1.sample)({
        clock: events_1.shipAPI.events.setPos,
        source: {
            map: map_1.mapModel.$mapStore,
            mode: map_1.mapModel.$mapMode,
        },
        filter: (source) => source.map !== null,
        fn: (source, clock) => ({
            source,
            pos: clock
        }),
        target: setPosFx
    });
};
exports.setMapPosListener = setMapPosListener;
