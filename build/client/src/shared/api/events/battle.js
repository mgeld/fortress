"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.events = void 0;
const effector_1 = require("effector");
const setBattleStatus = (0, effector_1.createEvent)();
const killPointer = (0, effector_1.createEvent)();
const setTeams = (0, effector_1.createEvent)();
const setMyTeam = (0, effector_1.createEvent)();
const setArena = (0, effector_1.createEvent)();
const addSector = (0, effector_1.createEvent)();
const loseSector = (0, effector_1.createEvent)();
const setTimer = (0, effector_1.createEvent)();
const stepTimer = (0, effector_1.createEvent)();
exports.events = {
    setArena,
    setTeams,
    killPointer,
    setBattleStatus,
    setMyTeam,
    addSector,
    loseSector,
    setTimer,
    stepTimer
};
