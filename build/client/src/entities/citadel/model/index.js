"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectors = exports.$citadelStore = void 0;
const effector_1 = require("effector");
const effector_react_1 = require("effector-react");
const events_1 = require("shared/api/events");
const { setCitadel, } = events_1.citadelAPI.events;
exports.$citadelStore = (0, effector_1.createStore)(null)
    .on(setCitadel, (_, citadel) => citadel);
const useCitadel = () => (0, effector_react_1.useStore)(exports.$citadelStore);
exports.selectors = {
    useCitadel,
};
