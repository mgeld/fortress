"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StormLevelUp = void 0;
const storm_corps_1 = require("entities/storm-corps");
const storm_corps_level_1 = require("entities/storm-corps/lib/storm-corps-level");
const level_up_1 = require("shared/api/level-up");
const level_up_2 = require("shared/ui/level-up");
const StormLevelUp = () => {
    const level = storm_corps_1.stormModel.selectors.useStormLevel();
    const click = () => (0, level_up_1.levelUpAPI)('storm-corps');
    const details = [{
            name: 'Уровень:',
            was: level,
            will: level + 1,
            prefix: ''
        }, {
            name: 'Макс. сила штурма:',
            was: storm_corps_level_1.StormCorpsLevel.getMaxpower(level),
            will: storm_corps_level_1.StormCorpsLevel.getMaxpower(level + 1),
            prefix: ''
        }, {
            name: 'Макс. вместимость:',
            was: storm_corps_level_1.StormCorpsLevel.getMaxInvaders(level),
            will: storm_corps_level_1.StormCorpsLevel.getMaxInvaders(level + 1),
            prefix: ''
        },];
    return (<level_up_2.LevelUp _click={click} item='Уровень Ш. Корпуса' upswing='Улучшение' level={level} details={details} price={{
            type: 'coins',
            quantity: storm_corps_level_1.StormCorpsLevel.getLevelUpPrice(level + 1)
        }}/>);
};
exports.StormLevelUp = StormLevelUp;
