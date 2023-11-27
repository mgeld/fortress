"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShipLevel = void 0;
class ShipLevel {
    static isUpLevel(level) {
        return level < 6;
    }
    static getMaxHealth(level) {
        return ShipLevel._shipHealth[level];
    }
    static getLevelUpPrice(level) {
        return ShipLevel._priceLevelUp[level];
    }
}
ShipLevel._shipHealth = {
    1: 150,
    2: 250,
    3: 360,
    4: 480,
    5: 610,
    6: 750
};
ShipLevel._priceLevelUp = {
    1: 0,
    2: 71,
    3: 290,
    4: 655,
    5: 1165,
    6: 1820
};
exports.ShipLevel = ShipLevel;
