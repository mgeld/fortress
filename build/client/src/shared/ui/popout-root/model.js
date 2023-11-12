"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.events = exports.selectors = exports.$popoutStore = void 0;
const effector_1 = require("effector");
const effector_react_1 = require("effector-react");
const usePopout = () => {
    return {
        data: (0, effector_react_1.useStore)(exports.$popoutStore)
    };
};
const setPopout = (0, effector_1.createEvent)();
exports.$popoutStore = (0, effector_1.createStore)(null)
    .on(setPopout, (_, modal) => modal);
exports.selectors = {
    usePopout,
};
const popoutFx = (0, effector_1.createEffect)((popout) => {
    if (popout)
        window.history.pushState({ popout }, popout);
    return popout;
});
(0, effector_1.sample)({
    clock: setPopout,
    target: popoutFx
});
(0, effector_1.sample)({
    clock: popoutFx.doneData,
    target: exports.$popoutStore
});
exports.events = {
    setPopout
};
