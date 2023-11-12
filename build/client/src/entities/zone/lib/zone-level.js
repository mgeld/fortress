"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZoneLevel = void 0;
class ZoneLevel {
    static getMaxLevelAllSectors(level) {
        return ZoneLevel._levelAllSectors[level];
    }
    static getMaxLevelSectors(level) {
        return ZoneLevel._levelSectors[level];
    }
}
ZoneLevel._levelAllSectors = {
    1: 50,
    2: 200,
    3: 500,
    4: 1000,
    5: 1750,
    6: 2800,
    7: 4200,
    8: 6000,
    9: 8250,
    10: 11000,
    11: 14300,
    12: 18200
};
ZoneLevel._levelSectors = {
    1: 50,
    2: 150,
    3: 300,
    4: 500,
    5: 750,
    6: 1050,
    7: 1400,
    8: 1800,
    9: 2250,
    10: 2750,
    11: 3300,
    12: 3900,
};
exports.ZoneLevel = ZoneLevel;
