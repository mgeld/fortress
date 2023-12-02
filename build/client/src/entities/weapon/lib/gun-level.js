"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GunLevel = void 0;
class GunLevel {
    static isUpLevel(levelGun, levelShip) {
        const shipMaxLevelGun = this.getShipMaxLevelGun(levelShip);
        return levelGun < shipMaxLevelGun;
    }
    static getShipMaxLevelGun(level) {
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
    1: 330,
    2: 380,
    3: 460,
    4: 570,
    5: 710,
    6: 880
};
GunLevel._priceLevelUp = {
    1: 0,
    2: 840,
    3: 3420,
    4: 7710,
    5: 13710,
    6: 21420
};
exports.GunLevel = GunLevel;
