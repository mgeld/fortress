"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.events = void 0;
const effector_1 = require("effector");
const setStormInvaders = (0, effector_1.createEvent)();
const setStormPower = (0, effector_1.createEvent)();
const setStormLevel = (0, effector_1.createEvent)();
const setStormCapacity = (0, effector_1.createEvent)();
const improveStormPower = (0, effector_1.createEvent)();
const addInvaders = (0, effector_1.createEvent)();
exports.events = {
    setStormInvaders,
    setStormPower,
    setStormLevel,
    setStormCapacity,
    improveStormPower,
    addInvaders
};
