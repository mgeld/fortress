"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectors = exports.useBomb = void 0;
const effector_1 = require("effector");
const effector_react_1 = require("effector-react");
const events_1 = require("shared/api/events");
const DEFAULT_STORE = [];
const { setBombs, delBombById, addBomb } = events_1.bombsAPI.events;
const $bombsStore = (0, effector_1.createStore)(DEFAULT_STORE)
    .on(setBombs, (_, bombs) => bombs)
    .on(addBomb, (bombs, bomb) => ([...bombs, bomb]))
    .on(delBombById, (bombs, bomb) => (bombs.slice().filter(item => {
    if (item.id === bomb.bomb_id)
        return false;
    return true;
})));
const useBomb = () => {
    return {
        bombs: (0, effector_react_1.useStore)($bombsStore)
    };
};
exports.useBomb = useBomb;
exports.selectors = {
    useBomb: exports.useBomb,
};
