"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GunLevel = void 0;
class GunLevel {
    static isUpLevel(level) {
        return level < 6;
    }
    static getLevelUpPrice(level) {
        return GunLevel._priceLevelUp[level];
    }
    static getMaxShells(level) {
        return GunLevel._gunShells[level];
    }
    static getMaxPower(level) {
        return GunLevel._gunPower[level];
    }
    static getMaxDistance(level) {
        return GunLevel._gunDistance[level];
    }
}
GunLevel._gunShells = {
    1: 200,
    2: 300,
    3: 410,
    4: 530,
    5: 660,
    6: 800
};
GunLevel._gunPower = {
    1: 30,
    2: 50,
    3: 72,
    4: 96,
    5: 122,
    6: 150
};
GunLevel._gunDistance = {
    1: 300,
    2: 350,
    3: 430,
    4: 540,
    5: 680,
    6: 850
};
GunLevel._priceLevelUp = {
    1: 0,
    2: 100,
    3: 300,
    4: 600,
    5: 1000,
    6: 1500
};
exports.GunLevel = GunLevel;
