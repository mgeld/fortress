"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StormCorpsPopout = void 0;
const ui_1 = require("shared/ui/ship-cell/ui");
const icons_1 = require("entities/ship/ui/assets/icons");
const popout_root_1 = require("shared/ui/popout-root");
const storm_corps_level_1 = require("../lib/storm-corps-level");
const __1 = require("..");
const ship_1 = require("entities/ship");
const alert_1 = require("shared/ui/alert");
const StormCorpsPopout = () => {
    const shipLevel = ship_1.shipModel.selectors.useShipLevel();
    const invaders = __1.stormModel.selectors.useStormInvaders();
    const power = __1.stormModel.selectors.useStormPower();
    const stormLevel = __1.stormModel.selectors.useStormLevel();
    return (<ui_1.ShipCell head={{
            icon: <icons_1.IconStorm width={54} height={54}/>,
            level: stormLevel,
            name: 'Штурмовой корпус',
            level_name: 'Уровень ШК',
            up: storm_corps_level_1.StormCorpsLevel.isUpLevel(stormLevel, shipLevel) ? {
                _click: () => popout_root_1.popoutModel.events.setPopout('storm-level-up')
            } : {
                _click: () => {
                    popout_root_1.popoutModel.events.setPopout('alert');
                    alert_1.alertModel.events.setAlert({
                        alert: 'Уровень Ш. Корпуса',
                        message: 'У вас максимальный уровень Штурмового Корпуса на текущий уровень корабля. Для улучшения корпуса, сначала неободимо повысить уровень корабля.',
                        action: {
                            close: false,
                            text: 'Закрыть',
                            _click: () => popout_root_1.popoutModel.events.setPopout("storm-corps")
                        }
                    });
                }
            }
        }} items={[
            {
                name: 'Штурмовики',
                counter: `${invaders} / ${storm_corps_level_1.StormCorpsLevel.getMaxInvaders(stormLevel)}`,
                _click: () => popout_root_1.popoutModel.events.setPopout('storm-add-invaders')
            },
            {
                name: 'Сила штурмовиков',
                counter: `${power} / ${storm_corps_level_1.StormCorpsLevel.getMaxpower(stormLevel)}`,
                _click: () => popout_root_1.popoutModel.events.setPopout('storm-improve-power')
            },
        ]}/>);
};
exports.StormCorpsPopout = StormCorpsPopout;
