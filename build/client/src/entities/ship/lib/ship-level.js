"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShipLevel = void 0;
class ShipLevel {
    static isUpLevel(levelShip, levelRank) {
        const rankMaxLevelShip = this.getRankMaxLevelShip(levelRank);
        return levelShip < rankMaxLevelShip;
    }
    static getRankMaxLevelShip(level) {
        const levels = {
            1: 1,
            2: 1,
            3: 1,
            4: 1,
            5: 2,
            6: 2,
            7: 2,
            8: 2,
            9: 3,
            10: 3,
            11: 3,
            12: 3,
            13: 4,
            14: 4,
            15: 4,
            16: 4,
            17: 5,
            18: 5,
            19: 5,
            20: 5,
            21: 6,
            22: 6,
            23: 6,
            24: 6,
        };
        return levels[level];
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
