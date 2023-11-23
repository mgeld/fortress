"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.events = exports.selectors = exports.$lockScreenStore = void 0;
const effector_1 = require("effector");
const effector_react_1 = require("effector-react");
const useLockScreen = () => (0, effector_react_1.useStore)(exports.$lockScreenStore);
const setLockScreen = (0, effector_1.createEvent)();
exports.$lockScreenStore = (0, effector_1.createStore)(null)
    .on(setLockScreen, (_, alert) => alert);
exports.selectors = {
    useLockScreen,
};
exports.events = {
    setLockScreen
};
