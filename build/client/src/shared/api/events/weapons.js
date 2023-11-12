"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.events = void 0;
const effector_1 = require("effector");
const setId = (0, effector_1.createEvent)();
const setDistance = (0, effector_1.createEvent)();
const increaseDistance = (0, effector_1.createEvent)();
const setPower = (0, effector_1.createEvent)();
const increasePower = (0, effector_1.createEvent)();
const setLevel = (0, effector_1.createEvent)();
const setBullets = (0, effector_1.createEvent)();
const increaseBullets = (0, effector_1.createEvent)();
exports.events = {
    setId,
    setBullets,
    setDistance,
    increaseDistance,
    setPower,
    increasePower,
    setLevel,
    increaseBullets
};
