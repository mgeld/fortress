"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBombHitMe = exports.changeHealthFx = void 0;
const effector_1 = require("effector");
const ship_1 = require("entities/ship");
const user_1 = require("entities/user");
const events_1 = require("shared/api/events");
const popout_root_1 = require("shared/ui/popout-root");
const snackbar_1 = require("shared/ui/snackbar");
exports.changeHealthFx = (0, effector_1.createEffect)(({ source, clock }) => {
    if (source.userId === clock.hitUserId) {
        snackbar_1.snackbarModel.events.newToast({
            text: 'Подрыв на мине!',
            t: 6
        });
        events_1.shipAPI.events.changeHealth(clock.damage);
        if (source.userHealth - clock.damage < 1)
            setTimeout(() => popout_root_1.popoutModel.events.setPopout('user-dead'), 1000);
    }
    else {
        events_1.pointersAPI.events.changeHealthPointer({
            health: clock.damage,
            userId: clock.hitUserId
        });
    }
});
const isBombHitMe = () => {
    (0, effector_1.sample)({
        clock: events_1.bombsAPI.events.hitBombInTarget,
        source: {
            userId: user_1.userModel.$userIdStore,
            userHealth: ship_1.shipModel.$userHealthStore,
        },
        fn: (source, clock) => ({ clock, source }),
        target: exports.changeHealthFx
    });
};
exports.isBombHitMe = isBombHitMe;
