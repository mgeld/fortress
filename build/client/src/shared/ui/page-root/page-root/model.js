"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.events = exports.selectors = exports.$pageStore = void 0;
const effector_1 = require("effector");
const effector_react_1 = require("effector-react");
const usePage = () => {
    return {
        data: (0, effector_react_1.useStore)(exports.$pageStore)
    };
};
const setPage = (0, effector_1.createEvent)();
exports.$pageStore = (0, effector_1.createStore)('map');
const pageFx = (0, effector_1.createEffect)((page) => {
    if (page)
        window.history.pushState({ page }, page);
    return page;
});
(0, effector_1.sample)({
    clock: setPage,
    target: pageFx
});
(0, effector_1.sample)({
    clock: pageFx.doneData,
    target: exports.$pageStore
});
exports.selectors = {
    usePage,
};
exports.events = {
    setPage
};
