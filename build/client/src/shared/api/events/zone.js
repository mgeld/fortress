"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.events = void 0;
const effector_1 = require("effector");
const setZoneSectors = (0, effector_1.createEvent)();
const setZoneLevel = (0, effector_1.createEvent)();
const setZoneTrophies = (0, effector_1.createEvent)();
const addZoneTrophies = (0, effector_1.createEvent)();
const setZoneCoins = (0, effector_1.createEvent)();
const addCoins = (0, effector_1.createEvent)();
const spendСoins = (0, effector_1.createEvent)();
const setZoneRubies = (0, effector_1.createEvent)();
const spendRubies = (0, effector_1.createEvent)();
const addRubies = (0, effector_1.createEvent)();
exports.events = {
    setZoneSectors,
    setZoneLevel,
    setZoneTrophies,
    addZoneTrophies,
    setZoneCoins,
    spendСoins,
    addCoins,
    spendRubies,
    setZoneRubies,
    addRubies
};
