"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFireHitMe = exports.changeHealthFx = void 0;
const effector_1 = require("effector");
const user_1 = require("entities/user");
const events_1 = require("shared/api/events");
const popout_root_1 = require("shared/ui/popout-root");
const snackbar_1 = require("shared/ui/snackbar");
exports.changeHealthFx = (0, effector_1.createEffect)(({ source, clock }) => {
    if (source.userId === clock.hitUserId) {
        snackbar_1.snackbarModel.events.newToast({
            text: 'Вас атакуют!',
            t: 5
        });
        events_1.shipAPI.events.setHealth(clock.health);
        if (clock.health < 1)
            setTimeout(() => popout_root_1.popoutModel.events.setPopout('user-dead'), 1000);
    }
    else {
        events_1.pointersAPI.events.setHealthPointer({
            health: clock.health,
            userId: clock.hitUserId
        });
    }
});
const isFireHitMe = () => {
    (0, effector_1.sample)({
        clock: events_1.firesAPI.events.hitFireInTarget,
        source: {
            userId: user_1.userModel.$userIdStore,
        },
        fn: (source, clock) => ({ clock, source }),
        target: exports.changeHealthFx
    });
};
exports.isFireHitMe = isFireHitMe;
