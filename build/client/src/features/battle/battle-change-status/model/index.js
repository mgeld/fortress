"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeBattleStatusListener = void 0;
const events_1 = require("shared/api/events");
const effector_1 = require("effector");
const map_1 = require("entities/map");
const popout_root_1 = require("shared/ui/popout-root");
const changeBattleFx = (0, effector_1.createEffect)(({ source, battleStatus }) => {
    if (battleStatus === 'wait' || battleStatus === 'search') {
        popout_root_1.popoutModel.events.setPopout('battle-pending');
    }
    else if (battleStatus === 'start') {
        setTimeout(() => {
            popout_root_1.popoutModel.events.setPopout(null);
        }, 2000);
    }
    else if (battleStatus === 'over') {
        setTimeout(() => {
            popout_root_1.popoutModel.events.setPopout('battle-over');
        }, 1000);
    }
});
const changeBattleStatusListener = () => {
    (0, effector_1.sample)({
        clock: events_1.battleAPI.events.setBattleStatus,
        source: {
            map: map_1.mapModel.$mapStore,
        },
        filter: (source) => source.map !== null,
        fn: (source, clock) => ({
            source,
            battleStatus: clock
        }),
        target: changeBattleFx
    });
};
exports.changeBattleStatusListener = changeBattleStatusListener;
