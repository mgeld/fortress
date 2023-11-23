"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.events = void 0;
const effector_1 = require("effector");
const battle_join_1 = require("shared/api/battle-join");
const battleConnect = (0, effector_1.createEvent)();
(0, effector_1.sample)({
    clock: battleConnect,
    target: (0, effector_1.createEffect)(() => {
        (0, battle_join_1.battleJoinAPI)();
    })
});
exports.events = {
    battleConnect
};
