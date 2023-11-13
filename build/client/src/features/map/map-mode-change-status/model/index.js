"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeModeStatusListener = void 0;
const events_1 = require("shared/api/events");
const effector_1 = require("effector");
const map_1 = require("entities/map");
const popout_root_1 = require("shared/ui/popout-root");
const ship_1 = require("entities/ship");
const changeModeFx = (0, effector_1.createEffect)(({ source, mode }) => {
    const { areal, map } = source;
    if (mode === 'select-place') {
        map.setMinZoom(6);
        map.setMaxBounds([[-90, -180], [90, 180]]);
        map.setZoom(6);
        popout_root_1.popoutModel.events.setPopout('battle-pending');
    }
    if (mode === 'invade') {
        map.setMinZoom(6);
        if (areal) {
            map.setMaxBounds([
                [areal[0][0] - 0.01, areal[0][1] - 0.01],
                [areal[1][0] + 0.01, areal[1][1] + 0.01],
            ]);
        }
        map.setZoom(6);
        popout_root_1.popoutModel.events.setPopout('battle-pending');
    }
    if (mode === 'battle') {
        source.map.setMinZoom(6);
        source.map.setMaxBounds([[-90, -180], [90, 180]]);
        map.setZoom(6);
        popout_root_1.popoutModel.events.setPopout('battle-pending');
    }
});
const changeModeStatusListener = () => {
    (0, effector_1.sample)({
        clock: events_1.mapAPI.events.setMapMode,
        source: {
            areal: ship_1.shipModel.$arealStore,
            map: map_1.mapModel.$mapStore,
            userPos: ship_1.shipModel.$userPositionStore,
        },
        filter: (source) => source.map !== null,
        fn: (source, clock) => ({
            source,
            mode: clock
        }),
        target: changeModeFx
    });
};
exports.changeModeStatusListener = changeModeStatusListener;
