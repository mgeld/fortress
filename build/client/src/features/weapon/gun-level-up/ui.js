"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GunLevelUp = void 0;
const weapon_1 = require("entities/weapon");
const gun_level_1 = require("entities/weapon/lib/gun-level");
const level_up_1 = require("shared/api/level-up");
const level_up_2 = require("shared/ui/level-up");
const GunLevelUp = () => {
    const level = weapon_1.weaponModel.selectors.useLevel();
    const click = () => (0, level_up_1.levelUpAPI)('gun');
    const details = [{
            name: 'Уровень:',
            was: level,
            will: level + 1,
            prefix: ''
        }, {
            name: 'Снаряды:',
            was: gun_level_1.GunLevel.getMaxShells(level),
            will: gun_level_1.GunLevel.getMaxShells(level + 1),
            prefix: ''
        }, {
            name: 'Макс. дальность:',
            was: gun_level_1.GunLevel.getMaxDistance(level),
            will: gun_level_1.GunLevel.getMaxDistance(level + 1),
            prefix: ''
        }, {
            name: 'Макс. сила:',
            was: gun_level_1.GunLevel.getMaxPower(level),
            will: gun_level_1.GunLevel.getMaxPower(level + 1),
            prefix: ''
        },];
    return (<level_up_2.LevelUp _click={click} item='Уровень пушки' upswing='Улучшение' level={level} details={details} price={{
            type: 'coins',
            quantity: gun_level_1.GunLevel.getLevelUpPrice(level + 1)
        }}/>);
};
exports.GunLevelUp = GunLevelUp;
