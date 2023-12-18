"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.events = void 0;
const effector_1 = require("effector");
const setHealth = (0, effector_1.createEvent)();
const changeHealth = (0, effector_1.createEvent)();
const addHealth = (0, effector_1.createEvent)();
const initPos = (0, effector_1.createEvent)();
const setPos = (0, effector_1.createEvent)();
const setLevel = (0, effector_1.createEvent)();
exports.events = {
    initPos,
    setPos,
    setLevel,
    setHealth,
    addHealth,
    changeHealth,
};
