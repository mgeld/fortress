"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectors = void 0;
const effector_1 = require("effector");
const effector_react_1 = require("effector-react");
const events_1 = require("shared/api/events");
const { setTakeFort } = events_1.sectorsAPI.events;
const { setContainer } = events_1.projectorAPI.events;
const $takeFortStore = (0, effector_1.createStore)(null)
    .on(setTakeFort, (_, payload) => payload);
const $containerFortStore = (0, effector_1.createStore)(null)
    .on(setContainer, (_, payload) => payload);
const useTakeFort = () => {
    return {
        data: (0, effector_react_1.useStore)($takeFortStore)
    };
};
const useContainerFort = () => {
    return {
        data: (0, effector_react_1.useStore)($containerFortStore)
    };
};
exports.selectors = {
    useTakeFort,
    useContainerFort
};
