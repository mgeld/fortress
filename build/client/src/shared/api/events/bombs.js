"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.events = void 0;
const effector_1 = require("effector");
const setBombs = (0, effector_1.createEvent)();
const addBomb = (0, effector_1.createEvent)();
const delBombById = (0, effector_1.createEvent)();
const hitBombInTarget = (0, effector_1.createEvent)();
exports.events = {
    addBomb,
    setBombs,
    delBombById,
    hitBombInTarget,
};
