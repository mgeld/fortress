"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectors = exports.events = exports.$userHealthStore = exports.$shipLevel = exports.$arealStore = exports.$userPositionStore = void 0;
const effector_1 = require("effector");
const effector_react_1 = require("effector-react");
const events_1 = require("shared/api/events");
const model_1 = require("entities/areal/model");
const get_user_1 = require("shared/api/get-user");
const reducer_1 = require("../lib/reducer");
const DEFAULT_STORE_POSITION = [0, 0];
const resetUser = (0, effector_1.createEvent)();
const setAreal = (0, effector_1.createEvent)();
const { setLevel, setPos, setHealth, changeHealth, addHealth, } = events_1.shipAPI.events;
const movePoint = (0, effector_1.createEvent)();
const getUserFx = (0, effector_1.createEffect)(() => {
    (0, get_user_1.getUserAPI)();
    return 0;
});
exports.$userPositionStore = (0, effector_1.createStore)(DEFAULT_STORE_POSITION)
    .on(movePoint, reducer_1.reducer)
    .on(setPos, (_, pos) => pos);
exports.$arealStore = (0, effector_1.createStore)(null)
    .on(setAreal, (_, areal) => areal);
exports.$shipLevel = (0, effector_1.createStore)(0)
    .on(setLevel, (_, areal) => areal);
(0, effector_1.sample)({
    clock: movePoint,
    source: {
        areal: exports.$arealStore,
        pos: exports.$userPositionStore
    },
    filter: (source) => { var _a; return !!source.pos[0] && (((_a = source.areal) === null || _a === void 0 ? void 0 : _a.toString()) !== model_1.Areal.getBounds(source.pos).toString()); },
    fn: (source, _) => model_1.Areal.getBounds(source.pos),
    target: exports.$arealStore
});
const DEFAULT_STORE_HEALTH = 0;
exports.$userHealthStore = (0, effector_1.createStore)(DEFAULT_STORE_HEALTH)
    .on(setHealth, (_, health) => health)
    .on(changeHealth, (health, damage) => health - damage)
    .on(addHealth, (health, h) => health + h);
(0, effector_1.sample)({
    clock: resetUser,
    target: getUserFx
});
exports.events = {
    movePoint,
    resetUser,
    setAreal
};
const useShip = () => {
    return {
        pos: (0, effector_react_1.useStore)(exports.$userPositionStore),
        health: (0, effector_react_1.useStore)(exports.$userHealthStore),
    };
};
const useShipPos = () => (0, effector_react_1.useStore)(exports.$userPositionStore);
const useShipHealth = () => (0, effector_react_1.useStore)(exports.$userHealthStore);
const useShipLevel = () => (0, effector_react_1.useStore)(exports.$shipLevel);
const useAreal = () => (0, effector_react_1.useStore)(exports.$arealStore);
exports.selectors = {
    useShip,
    useShipLevel,
    useShipPos,
    useShipHealth,
    useAreal
};
