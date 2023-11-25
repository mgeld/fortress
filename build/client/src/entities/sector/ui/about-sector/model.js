"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.events = void 0;
const effector_1 = require("effector");
const arena_1 = require("entities/arena");
const map_1 = require("entities/map");
const battle_get_about_sector_1 = require("shared/api/battle-get-about-sector");
const get_about_sector_1 = require("shared/api/get-about-sector");
const aboutSectorFx = (0, effector_1.createEffect)(({ source, sect }) => {
    if (!source.mapMode)
        return;
    if (source.mapMode === 'invade') {
        (0, get_about_sector_1.getAboutSectorAPI)(sect);
    }
    else {
        if (source === null || source === void 0 ? void 0 : source.arena)
            (0, battle_get_about_sector_1.battleGetAboutSectorAPI)(sect, source.arena.id);
    }
});
const getAboutInfo = (0, effector_1.createEvent)();
(0, effector_1.sample)({
    clock: getAboutInfo,
    source: {
        mapMode: map_1.mapModel.$mapMode,
        arena: arena_1.arenaModel.$arenaStore
    },
    fn: (source, sect) => ({ source, sect }),
    target: aboutSectorFx
});
exports.events = {
    getAboutInfo
};
