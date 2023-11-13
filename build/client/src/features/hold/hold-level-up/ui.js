"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HoldLevelUp = void 0;
const hold_1 = require("entities/hold");
const hold_level_1 = require("entities/hold/lib/hold-level");
const level_up_1 = require("shared/api/level-up");
const level_up_2 = require("shared/ui/level-up");
const HoldLevelUp = () => {
    const level = hold_1.holdModel.selectors.useHoldLevel();
    const click = () => (0, level_up_1.levelUpAPI)('hold');
    const details = [{
            name: 'Уровень:',
            was: level,
            will: level + 1,
            prefix: ''
        }, {
            name: 'Вместимость:',
            was: hold_level_1.HoldLevel.getMaxItems(level),
            will: hold_level_1.HoldLevel.getMaxItems(level + 1),
            prefix: ''
        },];
    return (<level_up_2.LevelUp _click={click} item='Уровень трюма' upswing='Улучшение' level={level} details={details} price={{
            type: 'coins',
            quantity: hold_level_1.HoldLevel.getLevelUpPrice(level + 1)
        }}/>);
};
exports.HoldLevelUp = HoldLevelUp;
