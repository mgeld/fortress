"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.events = void 0;
const ship_1 = require("entities/ship");
const alert_1 = require("shared/ui/alert");
const popout_root_1 = require("shared/ui/popout-root");
const battle_join_1 = require("shared/api/battle-join");
const effector_1 = require("effector");
const battleConnect = (0, effector_1.createEvent)();
const isHealthFx = (0, effector_1.createEffect)((props) => {
    if (props.source.health < 1) {
        popout_root_1.popoutModel.events.setPopout('alert');
        alert_1.alertModel.events.setAlert({
            alert: 'Корабль сломан',
            message: 'Ваш корабль сломан. Чтобы участвовать в битвах, необходимо улучшить состояние корабля.',
            action: {
                close: false,
                text: 'Улучшить',
                _click: () => popout_root_1.popoutModel.events.setPopout('ship-improve-health')
            }
        });
        return 0;
    }
    if (props === null || props === void 0 ? void 0 : props.battleId)
        (0, battle_join_1.battleJoinAPI)(props.battleId);
    else
        (0, battle_join_1.battleJoinAPI)();
});
(0, effector_1.sample)({
    clock: battleConnect,
    source: {
        health: ship_1.shipModel.$userHealthStore
    },
    fn: (source, battleId) => ({ source, battleId }),
    target: isHealthFx
});
exports.events = {
    battleConnect
};
