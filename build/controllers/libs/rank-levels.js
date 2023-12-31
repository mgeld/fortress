"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RankLevels = void 0;
class RankLevels {
    static getRankMaxLevelShip(rank) {
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
        return levels[rank];
    }
    static getRankMaxLevelCitadel(rank) {
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
        return levels[rank];
    }
}
exports.RankLevels = RankLevels;
