"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.events = void 0;
const effector_1 = require("effector");
const setFires = (0, effector_1.createEvent)();
const addFire = (0, effector_1.createEvent)();
const delFireById = (0, effector_1.createEvent)();
const hitFireInTarget = (0, effector_1.createEvent)();
exports.events = {
    addFire,
    setFires,
    delFireById,
    hitFireInTarget,
};
