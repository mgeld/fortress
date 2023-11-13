"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.events = void 0;
const effector_1 = require("effector");
const setPointers = (0, effector_1.createEvent)();
const newPointer = (0, effector_1.createEvent)();
const delPointer = (0, effector_1.createEvent)();
const updatePositionPointer = (0, effector_1.createEvent)();
const changeHealthPointer = (0, effector_1.createEvent)();
const setHealthPointer = (0, effector_1.createEvent)();
exports.events = {
    newPointer,
    delPointer,
    setPointers,
    updatePositionPointer,
    changeHealthPointer,
    setHealthPointer
};
