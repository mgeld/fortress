"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StormCorpsLevel = void 0;
class StormCorpsLevel {
    static isUpLevel(levelStorm, levelShip) {
        const shipMaxLevelStorm = this.getShipMaxLevelStorm(levelShip);
        return levelStorm < shipMaxLevelStorm;
    }
    static getShipMaxLevelStorm(level) {
        const levels = {
            1: 2,
            2: 4,
            3: 6,
            4: 8,
            5: 10,
            6: 12,
        };
        return levels[level];
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
    1: 150,
    2: 200,
    3: 255,
    4: 315,
    5: 380,
    6: 450,
    7: 525,
    8: 605,
    9: 690,
    10: 780,
    11: 875,
    12: 975
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
    2: 400,
    3: 806,
    4: 1209,
    5: 3283,
    6: 4924,
    7: 7401,
    8: 11102,
    9: 13161,
    10: 19742,
    11: 20563,
    12: 30844
};
exports.StormCorpsLevel = StormCorpsLevel;
