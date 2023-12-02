"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.events = void 0;
const effector_1 = require("effector");
const ship_1 = require("entities/ship");
const battle_join_1 = require("shared/api/battle-join");
const alert_1 = require("shared/ui/alert");
const popout_root_1 = require("shared/ui/popout-root");
const battleConnect = (0, effector_1.createEvent)();
const isHealthFx = (0, effector_1.createEffect)(({ health }) => {
    if (health < 1) {
        popout_root_1.popoutModel.events.setPopout('alert');
        alert_1.alertModel.events.setAlert({
            alert: 'Корабль сломан',
            message: 'Ваш корабль сломан. Чтобы участвовать в битвах, необходимо улучшить состояние корабля.',
            action: {
                close: false,
                text: 'Повысить',
                _click: () => popout_root_1.popoutModel.events.setPopout('ship-improve-health')
            }
        });
        return 0;
    }
    (0, battle_join_1.battleJoinAPI)();
});
(0, effector_1.sample)({
    clock: battleConnect,
    source: {
        health: ship_1.shipModel.$userHealthStore
    },
    target: isHealthFx
});
exports.events = {
    battleConnect
};
