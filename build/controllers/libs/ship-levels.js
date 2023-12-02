"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShipLevels = void 0;
class ShipLevels {
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
}
exports.ShipLevels = ShipLevels;
