"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.events = exports.selectors = exports.$unitBuySelect = void 0;
const effector_1 = require("effector");
const effector_react_1 = require("effector-react");
const selectBuyUnit = (0, effector_1.createEvent)();
exports.$unitBuySelect = (0, effector_1.createStore)(null)
    .on(selectBuyUnit, (_, unit) => unit);
const useBuyUnit = () => (0, effector_react_1.useStore)(exports.$unitBuySelect);
exports.selectors = {
    useBuyUnit
};
exports.events = {
    selectBuyUnit
};
