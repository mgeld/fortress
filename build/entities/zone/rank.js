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
    increaseExperience(exp) {
        this._tempExp = this._tempExp + exp;
    }
    addExperience() {
        this._exp = this._tempExp;
        this._tempExp = 0;
        if (this._exp >= Rank.levelExp()[this._rank]) {
            this._rank += 1;
        }
        return {
            rank: this._rank,
            amount: this._exp,
        };
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
