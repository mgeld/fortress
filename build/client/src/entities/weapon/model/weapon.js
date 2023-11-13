"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectors = exports.$gunBulletsStore = exports.$gunDistanceStore = exports.$gunPowerStore = exports.$gunLevelStore = exports.$gunIdStore = void 0;
const effector_1 = require("effector");
const effector_react_1 = require("effector-react");
const events_1 = require("shared/api/events");
const { setDistance, increaseDistance, setPower, increasePower, setBullets, increaseBullets, setId, setLevel, } = events_1.weaponsAPI.events;
exports.$gunIdStore = (0, effector_1.createStore)('')
    .on(setId, (_, id) => id);
exports.$gunLevelStore = (0, effector_1.createStore)(0)
    .on(setLevel, (_, level) => level);
exports.$gunPowerStore = (0, effector_1.createStore)(0)
    .on(setPower, (_, power) => power)
    .on(increasePower, (power, p) => power + p);
exports.$gunDistanceStore = (0, effector_1.createStore)(0)
    .on(setDistance, (_, dist) => dist)
    .on(increaseDistance, (dist, d) => dist + d);
exports.$gunBulletsStore = (0, effector_1.createStore)(0)
    .on(setBullets, (_, bullets) => bullets)
    .on(increaseBullets, (bullets, b) => bullets + b);
const useLevel = () => (0, effector_react_1.useStore)(exports.$gunLevelStore);
const usePower = () => (0, effector_react_1.useStore)(exports.$gunPowerStore);
const useDistance = () => (0, effector_react_1.useStore)(exports.$gunDistanceStore);
const useBullets = () => (0, effector_react_1.useStore)(exports.$gunBulletsStore);
exports.selectors = {
    useLevel,
    usePower,
    useDistance,
    useBullets,
};
