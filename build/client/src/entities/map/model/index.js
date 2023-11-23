"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectors = exports.events = exports.$mapMode = exports.$mapCenterDefaultStore = exports.$mapStore = void 0;
const effector_1 = require("effector");
const effector_react_1 = require("effector-react");
const events_1 = require("shared/api/events");
const setMap = (0, effector_1.createEvent)();
const setLatLngMap = (0, effector_1.createEvent)();
const setMapCenter = (0, effector_1.createEvent)();
exports.$mapStore = (0, effector_1.createStore)(null)
    .on(setMap, (_, map) => map);
exports.$mapCenterDefaultStore = (0, effector_1.createStore)([55.74953, 37.61581])
    .on(setMapCenter, (_, latlng) => latlng);
const $mapClickLatLng = (0, effector_1.createStore)(null)
    .on(setLatLngMap, (_, latlng) => latlng);
exports.$mapMode = (0, effector_1.createStore)(null)
    .on(events_1.mapAPI.events.setMapMode, (_, mode) => mode);
$mapClickLatLng.watch(value => console.log('mapClickLatLng value', value));
exports.events = {
    setMap,
    setLatLngMap
};
const useMapClickLatLng = () => {
    return {
        latlng: (0, effector_react_1.useStore)($mapClickLatLng)
    };
};
const useMapMode = () => {
    return {
        mode: (0, effector_react_1.useStore)(exports.$mapMode)
    };
};
const useMapLayout = () => (0, effector_react_1.useStore)(exports.$mapStore);
const useMapCenter = () => (0, effector_react_1.useStore)(exports.$mapCenterDefaultStore);
exports.selectors = {
    useMapMode,
    useMapCenter,
    useMapClickLatLng,
    useMapLayout
};
