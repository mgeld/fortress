"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setMaxBoundsListener = void 0;
const effector_1 = require("effector");
const map_1 = require("entities/map");
const ship_1 = require("entities/ship");
const setMaxBoundsFx = (0, effector_1.createEffect)(({ map, areal }) => {
    if (!map)
        return;
    map.setMaxBounds([
        [areal[0][0] - 0.01, areal[0][1] - 0.01],
        [areal[1][0] + 0.01, areal[1][1] + 0.01],
    ]);
});
const setMaxBoundsListener = () => {
    (0, effector_1.sample)({
        clock: ship_1.shipModel.$arealStore,
        source: {
            map: map_1.mapModel.$mapStore,
        },
        filter: (source, areal) => areal !== null,
        fn: (source, areal) => ({
            map: source.map,
            areal: areal
        }),
        target: setMaxBoundsFx
    });
};
exports.setMaxBoundsListener = setMaxBoundsListener;
