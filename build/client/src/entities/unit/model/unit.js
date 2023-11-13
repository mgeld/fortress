"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.events = exports.selectors = exports.$unitSelect = void 0;
const effector_1 = require("effector");
const effector_react_1 = require("effector-react");
const selectUnit = (0, effector_1.createEvent)();
exports.$unitSelect = (0, effector_1.createStore)(null)
    .on(selectUnit, (_, extraction) => extraction);
exports.$unitSelect.watch(val => console.log('unitSelect watch', val));
const useUnit = () => (0, effector_react_1.useStore)(exports.$unitSelect);
exports.selectors = {
    useUnit,
};
exports.events = {
    selectUnit,
};
