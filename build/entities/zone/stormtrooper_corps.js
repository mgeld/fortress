"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StormtrooperCorps = void 0;
class StormtrooperCorps {
    constructor(props) {
        this._level = props.level;
        this._invaders = props.invaders;
        this._power = props.power;
    }
    unmarshal() {
        return {
            level: this._level,
            invaders: this._invaders,
            power: this._power,
        };
    }
    increasePower(power) {
        const maxValueLevel = StormtrooperCorps.getLevelMaxPower(this._level);
        if (maxValueLevel > this._power) {
            const was_number = this._power;
            const summ = was_number + power;
            this._power = summ > maxValueLevel ? maxValueLevel : summ;
            return [was_number, this._power];
        }
        return 'limit';
    }
    addInvaders(invaders) {
        const maxValueLevel = StormtrooperCorps.getLevelMaxInvaders(this._level);
        if (maxValueLevel > this._invaders) {
            const was_number = this._invaders;
            const summ = was_number + invaders;
            this._invaders = summ > maxValueLevel ? maxValueLevel : summ;
            return [was_number, this._invaders];
        }
        return 'limit';
    }
    arriveInvader() {
        this._invaders = this._invaders + 1;
        return this._invaders;
    }
    leaveInvader() {
        this._invaders = this._invaders - 1;
        return this._invaders;
    }
    storm() {
        this.leaveInvader();
        return this._invaders;
    }
    upLevel() {
        if (!StormtrooperCorps.validLevel(this._level + 1)) {
            throw new Error('');
        }
        this._level = this._level + 1;
        return this._level;
    }
    static getLevelUpPrice(level) {
        const levels = {
            1: 0,
            2: 400,
            3: 806,
            4: 1209,
            5: 3283,
            6: 4924,
            7: 7401,
            8: 11102,
            9: 13161,
            10: 19742,
            11: 20563,
            12: 30844
        };
        return levels[level];
    }
    static validLevel(level) {
        return level > 0 && level <= 12;
    }
    static getLevelMaxPower(level) {
        const levels = {
            1: 15,
            2: 25,
            3: 40,
            4: 60,
            5: 85,
            6: 115,
            7: 150,
            8: 190,
            9: 235,
            10: 285,
            11: 340,
            12: 400,
        };
        return levels[level];
    }
    static getLevelMaxInvaders(level) {
        const levels = {
            1: 150,
            2: 200,
            3: 255,
            4: 315,
            5: 380,
            6: 450,
            7: 525,
            8: 605,
            9: 690,
            10: 780,
            11: 875,
            12: 975
        };
        return levels[level];
    }
    get level() {
        return this._level;
    }
    get invaders() {
        return this._invaders;
    }
    get power() {
        return this._power;
    }
}
exports.StormtrooperCorps = StormtrooperCorps;
