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
        this._power = this._power + power;
        return this._power;
    }
    addInvaders(invaders) {
        this._invaders = this._invaders + invaders;
        return this._invaders;
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
        return level > 0 && level <= 6;
    }
    static levelMaxPower() {
        return {
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
    }
    static levelMaxInvaders() {
        return {
            1: 50,
            2: 100,
            3: 155,
            4: 215,
            5: 280,
            6: 350,
            7: 425,
            8: 505,
            9: 590,
            10: 680,
            11: 775,
            12: 875
        };
    }
    get level() {
        return this._level;
    }
    get invaders() {
        return this._invaders;
    }
}
exports.StormtrooperCorps = StormtrooperCorps;
