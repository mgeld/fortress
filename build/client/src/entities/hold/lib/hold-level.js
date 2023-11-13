"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HoldLevel = void 0;
class HoldLevel {
    static isUpLevel(level) {
        return level < 6;
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
    2: 100,
    3: 300,
    4: 600,
    5: 1000,
    6: 1500
};
exports.HoldLevel = HoldLevel;
