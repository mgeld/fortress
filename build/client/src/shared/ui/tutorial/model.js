"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.events = exports.selectors = exports.$tutorialStore = void 0;
const effector_1 = require("effector");
const effector_react_1 = require("effector-react");
const useTutorial = () => (0, effector_react_1.useStore)(exports.$tutorialStore);
const setTutorial = (0, effector_1.createEvent)();
exports.$tutorialStore = (0, effector_1.createStore)(null)
    .on(setTutorial, (_, tut) => tut);
exports.selectors = {
    useTutorial,
};
exports.events = {
    setTutorial
};
