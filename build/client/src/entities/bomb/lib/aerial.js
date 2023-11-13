"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aerial = void 0;
class Aerial {
    constructor(lvl) {
        this.name = 'Пушка';
        this.symbol = 'aerial';
        this._level = lvl;
    }
    static level(lvl) {
        return new Aerial(lvl);
    }
    upLevel() {
        if (!Aerial.validLevel(this._level + 1)) {
            throw new Error('');
        }
        this._level = this._level + 1;
        return this._level;
    }
    static validLevel(level) {
        return level > 0 && level <= 5;
    }
    get damage() {
        if (this._level === 1) {
            return 10;
        }
        if (this._level === 2) {
            return 15;
        }
        if (this._level === 3) {
            return 20;
        }
        if (this._level === 4) {
            return 25;
        }
        if (this._level === 5) {
            return 30;
        }
        return 0;
    }
    get radius() {
        if (this._level === 1) {
            return 60;
        }
        if (this._level === 2) {
            return 80;
        }
        if (this._level === 3) {
            return 100;
        }
        if (this._level === 4) {
            return 120;
        }
        if (this._level === 5) {
            return 140;
        }
        return 0;
    }
    get level() {
        return this._level;
    }
}
exports.Aerial = Aerial;
