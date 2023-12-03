"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectors = void 0;
const effector_1 = require("effector");
const effector_react_1 = require("effector-react");
const events_1 = require("shared/api/events");
const { setZones } = events_1.ratingAPI.events;
const $ratingZonesStore = (0, effector_1.createStore)(null)
    .on(setZones, (_, zones) => zones);
const useRating = () => {
    return {
        zones: (0, effector_react_1.useStore)($ratingZonesStore)
    };
};
exports.selectors = {
    useRating
};
