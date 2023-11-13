"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectors = exports.useFire = void 0;
const effector_1 = require("effector");
const effector_react_1 = require("effector-react");
const events_1 = require("shared/api/events");
const DEFAULT_STORE = [];
const { setFires, addFire, delFireById, } = events_1.firesAPI.events;
const $firesStore = (0, effector_1.createStore)(DEFAULT_STORE)
    .on(setFires, (_, fires) => fires)
    .on(addFire, (fires, fire) => ([...fires, fire]))
    .on(delFireById, (fires, fire) => (fires.slice().filter(item => {
    if (item.id === fire.fire_id)
        return false;
    return true;
})));
const useFire = () => {
    return {
        fires: (0, effector_react_1.useStore)($firesStore)
    };
};
exports.useFire = useFire;
exports.selectors = {
    useFire: exports.useFire,
};
