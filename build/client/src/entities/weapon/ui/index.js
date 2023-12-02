"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GunPopout = void 0;
const ui_1 = require("shared/ui/ship-cell/ui");
const __1 = require("..");
const popout_root_1 = require("shared/ui/popout-root");
const gun_level_1 = require("../lib/gun-level");
const _icons_1 = require("shared/assets/icons/_icons");
const ship_1 = require("entities/ship");
const alert_1 = require("shared/ui/alert");
const GunPopout = () => {
    const shipLevel = ship_1.shipModel.selectors.useShipLevel();
    const gunLevel = __1.weaponModel.selectors.useLevel();
    const bullets = __1.weaponModel.selectors.useBullets();
    const distance = __1.weaponModel.selectors.useDistance();
    const power = __1.weaponModel.selectors.usePower();
    return (<ui_1.ShipCell head={{
            icon: <_icons_1.IconShipGun width={54} height={54}/>,
            level: gunLevel,
            name: 'Обычная пушка',
            level_name: 'Уровень пушки',
            up: gun_level_1.GunLevel.isUpLevel(gunLevel, shipLevel) ? {
                _click: () => popout_root_1.popoutModel.events.setPopout('gun-level-up')
            } : {
                _click: () => {
                    popout_root_1.popoutModel.events.setPopout('alert');
                    alert_1.alertModel.events.setAlert({
                        alert: 'Уровень Пушки',
                        message: 'У вас максимальный уровень Пушки на текущий уровень корабля. Для улучшения пушки, сначала неободимо повысить уровень корабля.',
                        action: {
                            close: false,
                            text: 'Закрыть',
                            _click: () => popout_root_1.popoutModel.events.setPopout(null)
                        }
                    });
                }
            }
        }} items={[
            {
                name: 'Дальность удара',
                counter: `${distance} / ${gun_level_1.GunLevel.getMaxDistance(gunLevel)}`,
                _click: () => popout_root_1.popoutModel.events.setPopout('gun-improve-distance')
            },
            {
                name: 'Мощность удара',
                counter: `${power} / ${gun_level_1.GunLevel.getMaxPower(gunLevel)}`,
                _click: () => popout_root_1.popoutModel.events.setPopout('gun-improve-power')
            },
        ]}/>);
};
exports.GunPopout = GunPopout;
