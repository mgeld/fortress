"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.events = exports.selectors = exports.$extractionSelect = exports.$holdLevelStrore = exports.$holdItemsStrore = void 0;
const effector_1 = require("effector");
const effector_react_1 = require("effector-react");
const events_1 = require("shared/api/events");
const selectExtraction = (0, effector_1.createEvent)();
const { addExtraction, delExtraction, setItems, setLevel } = events_1.holdAPI.events;
exports.$holdItemsStrore = (0, effector_1.createStore)([])
    .on(setItems, (_, items) => items)
    .on(addExtraction, (extraction, newExtr) => [...extraction, newExtr])
    .on(delExtraction, (extraction, index) => {
    extraction.splice(index, 1);
    return extraction;
});
exports.$holdLevelStrore = (0, effector_1.createStore)(0)
    .on(setLevel, (_, level) => level);
exports.$holdItemsStrore.watch(val => console.log('holdItemsStrore watch', val));
exports.$extractionSelect = (0, effector_1.createStore)(null)
    .on(selectExtraction, (_, extraction) => extraction);
const useExtraction = () => (0, effector_react_1.useStore)(exports.$extractionSelect);
const useHoldItems = () => (0, effector_react_1.useStore)(exports.$holdItemsStrore);
const useHoldLevel = () => (0, effector_react_1.useStore)(exports.$holdLevelStrore);
exports.selectors = {
    useExtraction,
    useHoldItems,
    useHoldLevel
};
exports.events = {
    selectExtraction,
};
