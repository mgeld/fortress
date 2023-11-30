"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.events = exports.selectors = exports.$sizeDroneStore = void 0;
const effector_1 = require("effector");
const effector_react_1 = require("effector-react");
const model_1 = require("entities/map/model");
const getDestination_1 = require("entities/sector/lib/getDestination");
const model_2 = require("entities/ship/model");
exports.$sizeDroneStore = (0, effector_1.createStore)({
    px: 0,
    degrees: 0
});
const getDroneSizefx = (0, effector_1.createEffect)(({ map, userPos }) => {
    const toPosLatLng = (0, getDestination_1.getDestination)(userPos[0], userPos[1], 30, 90);
    const fromPoint = map.latLngToLayerPoint(userPos);
    const toPoint = map.latLngToLayerPoint(toPosLatLng);
    return {
        px: toPoint.x - fromPoint.x,
        degrees: Math.abs(userPos[1] - toPosLatLng[1])
    };
});
(0, effector_1.sample)({
    clock: model_2.$arealStore,
    target: (0, effector_1.createEffect)(() => setSizeDrone())
});
const setSizeDrone = (0, effector_1.createEvent)();
(0, effector_1.sample)({
    clock: setSizeDrone,
    source: {
        userPos: model_2.$userPositionStore,
        map: model_1.$mapStore
    },
    filter: (source) => source.map !== null && source.userPos[0] !== 0,
    target: getDroneSizefx
});
(0, effector_1.sample)({
    clock: getDroneSizefx.doneData,
    target: exports.$sizeDroneStore
});
const useDroneSize = () => (0, effector_react_1.useStore)(exports.$sizeDroneStore);
exports.selectors = {
    useDroneSize,
};
exports.events = {
    setSizeDrone
};
