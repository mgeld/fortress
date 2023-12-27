"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.events = void 0;
const effector_1 = require("effector");
const setZones = (0, effector_1.createEvent)();
const selectAbductionZone = (0, effector_1.createEvent)();
exports.events = {
    setZones,
    selectAbductionZone
};
