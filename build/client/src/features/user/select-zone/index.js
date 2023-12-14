"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setSelectMyZone = exports.initSelectZoneSample = void 0;
const zone_1 = require("entities/zone");
const effector_1 = require("effector");
const user_1 = require("entities/user");
const citadel_1 = require("entities/citadel");
const events_1 = require("shared/api/events");
const initSelectZoneSample = () => { };
exports.initSelectZoneSample = initSelectZoneSample;
const selectMyZone = (0, effector_1.createEvent)();
(0, effector_1.sample)({
    clock: selectMyZone,
    source: {
        id: user_1.userModel.$userIdStore,
        color: zone_1.zoneModel.$zoneColorStore,
        description: zone_1.zoneModel.$zoneDescriptionStore,
        trophies: zone_1.zoneModel.$zoneTrophiesStore,
        zone_level: zone_1.zoneModel.$zoneLevelStore,
        zone_sectors: zone_1.zoneModel.$zoneSectorsStore,
        rank_level: user_1.userModel.$rankLevelStore,
        rank_exp: user_1.userModel.$rankExpStore,
        icon: user_1.userModel.$userIconStore,
        name: user_1.userModel.$userNameStore,
        citadel: citadel_1.citadelModel.$citadelStore,
        vk_id: user_1.userModel.$userVkIdStore
    },
    fn: (source) => ({
        id: source.id,
        color: source.color,
        description: source.description,
        trophies: source.trophies,
        zone_level: source.zone_level,
        zone_sectors: source.zone_sectors,
        rank_level: source.rank_level,
        rank_exp: source.rank_exp,
        icon: source.icon,
        name: source.name,
        sectorId: source.citadel.id,
        latlng: source.citadel.latlng,
        vk_id: source.vk_id,
    }),
    target: events_1.ratingAPI.events.selectRatingZone
});
const setSelectMyZone = () => selectMyZone();
exports.setSelectMyZone = setSelectMyZone;
