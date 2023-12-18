"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.events = exports.selectors = exports.$satelliteStore = void 0;
const effector_1 = require("effector");
const effector_react_1 = require("effector-react");
const useMapSatellite = () => (0, effector_react_1.useStore)(exports.$satelliteStore);
const setMapSatellite = (0, effector_1.createEvent)();
exports.$satelliteStore = (0, effector_1.createStore)(null)
    .on(setMapSatellite, (_, satellite) => satellite);
exports.selectors = {
    useMapSatellite
};
exports.events = {
    setMapSatellite
};
