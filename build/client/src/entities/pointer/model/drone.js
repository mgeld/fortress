"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.events = exports.selectors = exports.$sizeDroneStore = void 0;
const effector_react_1 = require("effector-react");
const model_1 = require("entities/map/model");
const getDestination_1 = require("shared/lib/getDestination");
const effector_1 = require("effector");
const ship_1 = require("entities/ship");
exports.$sizeDroneStore = (0, effector_1.createStore)({
    px: 0,
    degrees: 0
});
const getDroneSizefx = (0, effector_1.createEffect)(({ map }) => {
    const mapCenter = map.getCenter();
    const pos = [mapCenter.lat, mapCenter.lng];
    const toPosLatLng = (0, getDestination_1.getDestination)(pos[0], pos[1], 30, 90);
    const fromPoint = map.latLngToLayerPoint(pos);
    const toPoint = map.latLngToLayerPoint(toPosLatLng);
    return {
        px: toPoint.x - fromPoint.x,
        degrees: Math.abs(pos[1] - toPosLatLng[1])
    };
});
const setSizeDrone = (0, effector_1.createEvent)();
(0, effector_1.sample)({
    clock: ship_1.shipModel.$arealStore,
    target: setSizeDrone
});
(0, effector_1.sample)({
    clock: setSizeDrone,
    source: {
        map: model_1.$mapStore
    },
    filter: (source) => source.map !== null,
    target: getDroneSizefx
});
(0, effector_1.sample)({
    clock: getDroneSizefx.doneData,
    target: exports.$sizeDroneStore
});
const useDroneSize = () => (0, effector_react_1.useStore)(exports.$sizeDroneStore);
exports.selectors = {
    useDroneSize
};
exports.events = {
    setSizeDrone
};
