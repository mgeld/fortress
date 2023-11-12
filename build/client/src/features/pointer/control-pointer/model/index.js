"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.battleDirection = exports.direction = void 0;
const effector_1 = require("effector");
const arena_1 = require("entities/arena");
const ship_1 = require("entities/ship");
const battle_direct_1 = require("shared/api/battle-direct");
const direct_1 = require("shared/api/direct");
const movePointFx = (0, effector_1.createEffect)(({ payload }) => {
    ship_1.shipModel.events.movePoint({ type: payload.direction });
});
exports.direction = (0, effector_1.createEvent)();
exports.battleDirection = (0, effector_1.createEvent)();
(0, effector_1.sample)({
    clock: exports.direction,
    fn: (direction) => ({
        payload: {
            direction
        }
    }),
    target: movePointFx
});
const directFx = (0, effector_1.createEffect)((source) => {
    if (source.battleStatus === 'default' ||
        source.battleStatus === 'over') {
        (0, direct_1.directAPI)(source.userPos);
    }
    else {
        (0, battle_direct_1.battleDirectAPI)(source.userPos);
    }
});
(0, effector_1.sample)({
    clock: movePointFx.done,
    source: {
        battleStatus: arena_1.arenaModel.$battleStatusStore,
        userPos: ship_1.shipModel.$userPositionStore
    },
    target: directFx
});
