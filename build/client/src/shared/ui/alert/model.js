"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.events = exports.selectors = exports.$alertStore = void 0;
const effector_1 = require("effector");
const effector_react_1 = require("effector-react");
const useAlert = () => (0, effector_react_1.useStore)(exports.$alertStore);
const setAlert = (0, effector_1.createEvent)();
exports.$alertStore = (0, effector_1.createStore)(null)
    .on(setAlert, (_, alert) => alert);
exports.selectors = {
    useAlert,
};
exports.events = {
    setAlert
};
