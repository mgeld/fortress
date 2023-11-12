"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShipLevelUp = void 0;
const ship_1 = require("entities/ship");
const ship_level_1 = require("entities/ship/lib/ship-level");
const level_up_1 = require("shared/api/level-up");
const level_up_2 = require("shared/ui/level-up");
const ShipLevelUp = () => {
    const level = ship_1.shipModel.selectors.useShipLevel();
    const click = () => (0, level_up_1.levelUpAPI)('ship');
    const details = [{
            name: 'Уровень:',
            was: level,
            will: level + 1,
            prefix: ''
        }, {
            name: 'Макс. здоровье:',
            was: ship_level_1.ShipLevel.getMaxHealth(level),
            will: ship_level_1.ShipLevel.getMaxHealth(level + 1),
            prefix: ''
        },];
    return (<level_up_2.LevelUp _click={click} item='Уровень корабля' upswing='Улучшения' level={level} details={details} price={{
            type: 'rubies',
            quantity: ship_level_1.ShipLevel.getLevelUpPrice(level + 1)
        }}/>);
};
exports.ShipLevelUp = ShipLevelUp;
