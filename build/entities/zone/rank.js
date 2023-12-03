"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rank = void 0;
class Rank {
    constructor(props) {
        this._rank = props.rank;
        this._exp = props.exp;
        this._tempExp = props.tempExp;
    }
    unmarshal() {
        return {
            rank: this._rank,
            exp: this._exp,
            tempExp: this._tempExp,
        };
    }
    addExp(exp) {
        const maxValueLevel = Rank.levelExp()[this._rank];
        const was_number = this._exp;
        const summ = was_number + exp;
        if (summ >= maxValueLevel) {
            this._rank += 1;
            this._exp = 0;
            return [was_number, this._exp];
        }
        this._exp = summ;
        return [was_number, this._exp];
    }
    increaseExp(exp) {
        this._tempExp = this._tempExp + exp;
    }
    saveExp() {
        const maxValueLevel = Rank.levelExp()[this._rank];
        const was_number = this._exp;
        const summ = was_number + this._tempExp;
        if (summ >= maxValueLevel) {
            this._rank += 1;
            this._exp = 0;
            return [was_number, this._exp];
        }
        this._exp = summ;
        this._tempExp = 0;
        return [was_number, this._exp];
    }
    static getLevelRewardRubies(rank) {
        const levels = {
            1: 42,
            2: 46,
            3: 55,
            4: 68,
            5: 72,
            6: 80,
            7: 94,
            8: 115,
            9: 115,
            10: 115,
            11: 115,
            12: 115,
            13: 115,
            14: 115,
            15: 115,
            16: 115,
            17: 115,
            18: 115,
            19: 115,
            20: 115,
            21: 115,
            22: 115,
            23: 115,
            24: 115
        };
        return levels[rank];
    }
    static levelExp() {
        return {
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
            24: 29330
        };
    }
    get exp() {
        return this._exp;
    }
    get rank() {
        return this._rank;
    }
    get tempExp() {
        return this._tempExp;
    }
}
exports.Rank = Rank;
