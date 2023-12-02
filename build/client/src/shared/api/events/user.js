"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.events = void 0;
const effector_1 = require("effector");
const setUser = (0, effector_1.createEvent)();
const setRankLevel = (0, effector_1.createEvent)();
const setRankExp = (0, effector_1.createEvent)();
const addRankExp = (0, effector_1.createEvent)();
const connectUser = (0, effector_1.createEvent)();
exports.events = {
    connectUser,
    setUser,
    setRankLevel,
    setRankExp,
    addRankExp,
};
