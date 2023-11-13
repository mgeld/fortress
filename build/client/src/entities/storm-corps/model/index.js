"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectors = exports.$capacityInvaders = exports.$stormPowerStore = exports.$stormInvadersStore = exports.$stormLevelStore = void 0;
const effector_1 = require("effector");
const effector_react_1 = require("effector-react");
const events_1 = require("shared/api/events");
const { setStormInvaders, setStormPower, setStormLevel, setStormCapacity, improveStormPower, addInvaders } = events_1.stormAPI.events;
exports.$stormLevelStore = (0, effector_1.createStore)(0)
    .on(setStormLevel, (_, level) => level);
exports.$stormInvadersStore = (0, effector_1.createStore)(0)
    .on(setStormInvaders, (_, invaders) => invaders)
    .on(addInvaders, (invaders, i) => invaders + i);
exports.$stormPowerStore = (0, effector_1.createStore)(0)
    .on(setStormPower, (_, power) => power)
    .on(improveStormPower, (power, p) => power + p);
exports.$capacityInvaders = (0, effector_1.createStore)(0)
    .on(setStormPower, (_, limit) => limit);
const useStormInvaders = () => (0, effector_react_1.useStore)(exports.$stormInvadersStore);
const useStormPower = () => (0, effector_react_1.useStore)(exports.$stormPowerStore);
const useStormLevel = () => (0, effector_react_1.useStore)(exports.$stormLevelStore);
exports.selectors = {
    useStormInvaders,
    useStormPower,
    useStormLevel,
};
