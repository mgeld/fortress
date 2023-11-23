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
            2: 100,
            3: 300,
            4: 600,
            5: 1000,
            6: 1500,
            7: 2100,
            8: 2800,
            9: 3600,
            10: 4500,
            11: 5500,
            12: 6600
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
            1: 100,
            2: 150,
            3: 205,
            4: 265,
            5: 330,
            6: 400,
            7: 475,
            8: 555,
            9: 640,
            10: 730,
            11: 825,
            12: 925
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
