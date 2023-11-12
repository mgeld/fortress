"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StormCorpsLevel = void 0;
class StormCorpsLevel {
    static isUpLevel(level) {
        return level < 12;
    }
    static getLevelUpPrice(level) {
        return StormCorpsLevel._priceLevelUp[level];
    }
    static getMaxInvaders(level) {
        return StormCorpsLevel._stormMaxInvaders[level];
    }
    static getMaxpower(level) {
        return StormCorpsLevel._stormMaxPower[level];
    }
}
StormCorpsLevel._stormMaxInvaders = {
    1: 50,
    2: 100,
    3: 155,
    4: 215,
    5: 280,
    6: 350,
    7: 425,
    8: 505,
    9: 590,
    10: 680,
    11: 775,
    12: 875
};
StormCorpsLevel._stormMaxPower = {
    1: 15,
    2: 25,
    3: 40,
    4: 60,
    5: 85,
    6: 115,
    7: 150,
    8: 190,
    9: 235,
    10: 285,
    11: 340,
    12: 400
};
StormCorpsLevel._priceLevelUp = {
    1: 0,
    2: 100,
    3: 300,
    4: 600,
    5: 1000,
    6: 1500,
    7: 2100,
    8: 2800,
    9: 3600,
    10: 4500,
    11: 5500,
    12: 6600
};
exports.StormCorpsLevel = StormCorpsLevel;
