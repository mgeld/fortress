"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.events = void 0;
const effector_1 = require("effector");
const setHealth = (0, effector_1.createEvent)();
const changeHealth = (0, effector_1.createEvent)();
const addHealth = (0, effector_1.createEvent)();
const setPos = (0, effector_1.createEvent)();
const setLevel = (0, effector_1.createEvent)();
setPos.watch((pos) => console.log('SET_POS WATCH', pos));
exports.events = {
    setPos,
    setLevel,
    setHealth,
    addHealth,
    changeHealth,
};
