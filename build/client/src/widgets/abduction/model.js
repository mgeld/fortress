"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.events = exports.selectors = void 0;
const effector_1 = require("effector");
const effector_react_1 = require("effector-react");
const user_1 = require("entities/user");
const events_1 = require("shared/api/events");
const get_abduction_1 = require("shared/api/get-abduction");
const { setZones, selectAbductionZone } = events_1.abductionAPI.events;
const $selectAbductionZoneStore = (0, effector_1.createStore)(null)
    .on(selectAbductionZone, (_, zone) => zone);
const $abductionZonesStore = (0, effector_1.createStore)(null)
    .on(setZones, (_, zones) => zones);
const useAbductionZones = () => (0, effector_react_1.useStore)($abductionZonesStore);
const useSelectZone = () => (0, effector_react_1.useStore)($selectAbductionZoneStore);
exports.selectors = {
    useAbductionZones,
    useSelectZone
};
const getMyAbduction = (0, effector_1.createEvent)();
(0, effector_1.sample)({
    clock: getMyAbduction,
    source: user_1.userModel.$userIdStore,
    target: (0, effector_1.createEffect)((zoneId) => {
        (0, get_abduction_1.getAbductionAPI)(zoneId, 1);
    })
});
exports.events = {
    getMyAbduction,
};
