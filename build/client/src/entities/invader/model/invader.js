"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectors = void 0;
const effector_1 = require("effector");
const effector_react_1 = require("effector-react");
const events_1 = require("shared/api/events");
const DEFAULT_STORE = [];
const { addTake, delTakeById, } = events_1.takesAPI.events;
const $invadersStore = (0, effector_1.createStore)(DEFAULT_STORE)
    .on(addTake, (invaders, invader) => ([...invaders, invader]))
    .on(delTakeById, (invaders, invader) => (invaders.slice().filter(item => {
    if (item.id === invader.take_id)
        return false;
    return true;
})));
$invadersStore.watch(() => console.log('$invadersStore'));
const useInvader = () => {
    return {
        takes: (0, effector_react_1.useStore)($invadersStore)
    };
};
exports.selectors = {
    useInvader,
};
