"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.events = void 0;
const effector_1 = require("effector");
const setBeam = (0, effector_1.createEvent)();
const setContainer = (0, effector_1.createEvent)();
const addBooty = (0, effector_1.createEvent)();
const delBootyById = (0, effector_1.createEvent)();
exports.events = {
    setBeam,
    addBooty,
    delBootyById,
    setContainer,
};
