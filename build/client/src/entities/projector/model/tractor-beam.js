"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectors = void 0;
const effector_1 = require("effector");
const effector_react_1 = require("effector-react");
const events_1 = require("shared/api/events");
const DEFAULT_STORE = null;
const { setBeam, } = events_1.projectorAPI.events;
const $beamStore = (0, effector_1.createStore)(DEFAULT_STORE)
    .on(setBeam, (_, beam) => beam);
$beamStore.watch(() => console.log('$beamStore'));
const useBeam = () => {
    return {
        beam: (0, effector_react_1.useStore)($beamStore)
    };
};
const DEFAULT_STORE_BOOTY = [];
const { addBooty, delBootyById, } = events_1.projectorAPI.events;
const $bootyStore = (0, effector_1.createStore)(DEFAULT_STORE_BOOTY)
    .on(addBooty, (booty_s, booty) => ([...booty_s, booty]))
    .on(delBootyById, (booty_s, booty) => (booty_s.slice().filter(item => {
    if (item.id === booty.booty_id)
        return false;
    return true;
})));
$bootyStore.watch(() => console.log('$bootyStore'));
const useBooty = () => {
    return {
        items: (0, effector_react_1.useStore)($bootyStore)
    };
};
exports.selectors = {
    useBeam,
    useBooty,
};
