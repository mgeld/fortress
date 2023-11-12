"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.events = void 0;
const effector_1 = require("effector");
const addTake = (0, effector_1.createEvent)();
const delTakeById = (0, effector_1.createEvent)();
exports.events = {
    addTake,
    delTakeById,
};
