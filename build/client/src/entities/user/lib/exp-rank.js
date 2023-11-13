"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpRank = void 0;
class ExpRank {
    static getExp(rank) {
        return ExpRank._rankExpList[rank];
    }
}
ExpRank._rankExpList = {
    1: 350,
    2: 455,
    3: 665,
    4: 980,
    5: 1400,
    6: 1925,
    7: 2555,
    8: 3290,
    9: 4130,
    10: 5075,
    11: 6125,
    12: 7280,
    13: 8540,
    14: 9905,
    15: 11375,
    16: 12950,
    17: 14630,
    18: 16415,
    19: 18305,
    20: 20300,
    21: 22400,
    22: 24605,
    23: 26915,
    24: 29330,
};
exports.ExpRank = ExpRank;
