"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.events = void 0;
const effector_1 = require("effector");
const user_1 = require("entities/user");
const battle_join_1 = require("shared/api/battle-join");
const battleConnect = (0, effector_1.createEvent)();
(0, effector_1.sample)({
    clock: battleConnect,
    target: (0, effector_1.attach)({
        source: {
            userId: user_1.userModel.$userIdStore
        },
        effect: (user) => {
            (0, battle_join_1.battleJoinAPI)(user.userId);
        }
    })
});
exports.events = {
    battleConnect
};
