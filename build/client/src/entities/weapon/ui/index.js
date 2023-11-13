"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GunPopout = void 0;
const ui_1 = require("shared/ui/ship-cell/ui");
const __1 = require("..");
const popout_root_1 = require("shared/ui/popout-root");
const gun_level_1 = require("../lib/gun-level");
const _icons_1 = require("shared/assets/icons/_icons");
const GunPopout = () => {
    const level = __1.weaponModel.selectors.useLevel();
    const bullets = __1.weaponModel.selectors.useBullets();
    const distance = __1.weaponModel.selectors.useDistance();
    const power = __1.weaponModel.selectors.usePower();
    return (<ui_1.ShipCell head={{
            icon: <_icons_1.IconShipGun width={54} height={54}/>,
            level,
            name: 'Обычная пушка',
            level_name: 'Уровень пушки',
            up: gun_level_1.GunLevel.isUpLevel(level) ? {
                _click: () => popout_root_1.popoutModel.events.setPopout('gun-level-up')
            } : null
        }} items={[
            {
                name: 'Дальность удара',
                counter: `${distance} / ${gun_level_1.GunLevel.getMaxDistance(level)}`,
                _click: () => popout_root_1.popoutModel.events.setPopout('gun-improve-distance')
            },
            {
                name: 'Мощность удара',
                counter: `${power} / ${gun_level_1.GunLevel.getMaxPower(level)}`,
                _click: () => popout_root_1.popoutModel.events.setPopout('gun-improve-power')
            },
        ]}/>);
};
exports.GunPopout = GunPopout;
