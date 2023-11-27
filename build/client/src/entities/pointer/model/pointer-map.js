"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.effects = exports.events = exports.selectors = exports.$pointersStore = void 0;
const effector_1 = require("effector");
const effector_react_1 = require("effector-react");
const events_1 = require("shared/api/events");
const DEFAULT_STORE = [];
const usePointers = () => {
    return {
        data: (0, effector_react_1.useStore)(exports.$pointersStore)
    };
};
const clearStore = (0, effector_1.createEvent)();
const { setPointers, newPointer, delPointer, updatePositionPointer, changeHealthPointer, setHealthPointer } = events_1.pointersAPI.events;
exports.$pointersStore = (0, effector_1.createStore)(DEFAULT_STORE)
    .on(setPointers, (_, pointers) => {
    return pointers;
})
    .on(newPointer, (prevPointers, pointer) => ([...prevPointers, pointer]))
    .on(delPointer, (prevPointers, data) => prevPointers.filter(pointer => pointer.userId !== data.userId))
    .on(updatePositionPointer, (prevPointers, data) => (prevPointers.map(pointer => {
    if (pointer.userId === data.userId)
        return Object.assign(Object.assign({}, pointer), { pos: data.pos });
    return pointer;
})))
    .on(changeHealthPointer, (prevPointers, data) => (prevPointers.map(prevPointer => {
    const nHealth = prevPointer.health - data.health;
    return prevPointer.userId === data.userId ? Object.assign(Object.assign({}, prevPointer), { health: nHealth < 0 ? 0 : nHealth }) : prevPointer;
})))
    .on(setHealthPointer, (prevPointers, data) => (prevPointers.map(prevPointer => prevPointer.userId === data.userId ? Object.assign(Object.assign({}, prevPointer), { health: data.health }) : prevPointer)))
    .on(clearStore, () => DEFAULT_STORE);
exports.$pointersStore.watch(val => console.log('pointersStore watch', val));
exports.selectors = {
    usePointers,
};
exports.events = {
    clearStore
};
exports.effects = {};
