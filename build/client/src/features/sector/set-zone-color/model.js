"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setMyZoneColorStartSample = void 0;
const effector_1 = require("effector");
const user_1 = require("entities/user");
const events_1 = require("shared/api/events");
const setMyZoneColorStartSample = () => { };
exports.setMyZoneColorStartSample = setMyZoneColorStartSample;
const setZoneColorFx = (0, effector_1.createEffect)((zone) => {
    events_1.sectorsAPI.events.setZoneColor({
        zone_id: zone.zoneId,
        color: zone.color
    });
});
(0, effector_1.sample)({
    clock: events_1.sectorsAPI.events.setMyZoneColor,
    source: user_1.userModel.$userIdStore,
    fn: (zoneId, color) => {
        return {
            zoneId,
            color
        };
    },
    target: setZoneColorFx
});
