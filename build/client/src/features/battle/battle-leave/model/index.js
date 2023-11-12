"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.battleLeave = void 0;
const effector_1 = require("effector");
const map_1 = require("entities/map");
const user_1 = require("entities/user");
const battle_leave_1 = require("shared/api/battle-leave");
exports.battleLeave = (0, effector_1.createEvent)();
(0, effector_1.sample)({
    clock: exports.battleLeave,
    target: (0, effector_1.attach)({
        source: {
            userId: user_1.userModel.$userIdStore,
            map: map_1.mapModel.$mapStore
        },
        effect: (source) => {
            (0, battle_leave_1.battleLeaveAPI)(source.userId);
        }
    })
});
