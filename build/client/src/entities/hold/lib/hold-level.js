"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HoldLevel = void 0;
class HoldLevel {
    static isUpLevel(levelHold, levelShip) {
        const shipMaxLevelHold = this.getShipMaxLevelHold(levelShip);
        return levelHold < shipMaxLevelHold;
    }
    static getShipMaxLevelHold(level) {
        const levels = {
            1: 1,
            2: 2,
            3: 3,
            4: 4,
            5: 5,
            6: 6,
        };
        return levels[level];
    }
    static getLevelUpPrice(level) {
        return HoldLevel._priceLevelUp[level];
    }
    static getMaxItems(level) {
        return HoldLevel._holdItems[level];
    }
}
HoldLevel._holdItems = {
    1: 10,
    2: 15,
    3: 20,
    4: 25,
    5: 30,
    6: 35
};
HoldLevel._priceLevelUp = {
    1: 0,
    2: 504,
    3: 2052,
    4: 4626,
    5: 8226,
    6: 12852
};
exports.HoldLevel = HoldLevel;
