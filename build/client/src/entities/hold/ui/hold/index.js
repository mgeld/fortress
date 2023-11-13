"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HoldPopout = void 0;
const hold_1 = require("entities/hold");
const page_root_1 = require("shared/ui/page-root");
const ui_1 = require("shared/ui/ship-cell/ui");
const popout_root_1 = require("shared/ui/popout-root");
const icons_1 = require("entities/ship/ui/assets/icons");
const hold_level_1 = require("entities/hold/lib/hold-level");
const HoldPopout = () => {
    const level = hold_1.holdModel.selectors.useHoldLevel();
    const lengthItems = hold_1.holdModel.selectors.useHoldItems().length;
    return (<ui_1.ShipCell head={{
            icon: <icons_1.IconHold width={48} height={48}/>,
            level,
            name: 'Грузовой трюм',
            level_name: 'Уровень трюма',
            up: hold_level_1.HoldLevel.isUpLevel(level) ? {
                _click: () => popout_root_1.popoutModel.events.setPopout('hold-level-up')
            } : null
        }} items={[{
                name: 'Предметы',
                counter: `${lengthItems} / ${hold_level_1.HoldLevel.getMaxItems(level)}`,
                _click: () => {
                    popout_root_1.popoutModel.events.setPopout(null);
                    page_root_1.pageModel.events.setPage('gun-shop');
                }
            }]}/>);
};
exports.HoldPopout = HoldPopout;
