"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.events = void 0;
const effector_1 = require("effector");
const setItems = (0, effector_1.createEvent)();
const setLevel = (0, effector_1.createEvent)();
const addExtraction = (0, effector_1.createEvent)();
const delExtraction = (0, effector_1.createEvent)();
exports.events = {
    setItems,
    setLevel,
    addExtraction,
    delExtraction
};
