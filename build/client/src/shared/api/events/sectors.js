"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.events = void 0;
const effector_1 = require("effector");
const setSectors = (0, effector_1.createEvent)();
const addSector = (0, effector_1.createEvent)();
const delSectorById = (0, effector_1.createEvent)();
const setSectorById = (0, effector_1.createEvent)();
const setZoneColor = (0, effector_1.createEvent)();
const setMyZoneColor = (0, effector_1.createEvent)();
const setTakeFort = (0, effector_1.createEvent)();
const setAboutSector = (0, effector_1.createEvent)();
const addZoneAreal = (0, effector_1.createEvent)();
exports.events = {
    setSectors,
    addSector,
    delSectorById,
    setTakeFort,
    setSectorById,
    setAboutSector,
    setZoneColor,
    setMyZoneColor,
    addZoneAreal
};
