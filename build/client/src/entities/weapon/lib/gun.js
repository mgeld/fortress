"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gun = void 0;
class Gun {
    constructor(lvl) {
        this.name = 'Пушка';
        this.symbol = 1;
        this._level = lvl;
    }
    static level(lvl) {
        return new Gun(lvl);
    }
    upLevel() {
        if (!Gun.validLevel(this._level + 1)) {
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
    get distance() {
        if (this._level === 1) {
            return 600;
        }
        if (this._level === 2) {
            return 900;
        }
        if (this._level === 3) {
            return 1200;
        }
        if (this._level === 4) {
            return 1500;
        }
        if (this._level === 5) {
            return 1800;
        }
        return 0;
    }
    get radius() {
        if (this._level === 1) {
            return 0.0004;
        }
        if (this._level === 2) {
            return 0.0004;
        }
        if (this._level === 3) {
            return 0.0004;
        }
        if (this._level === 4) {
            return 0.0004;
        }
        if (this._level === 5) {
            return 0.0004;
        }
        return 0;
    }
    get level() {
        return this._level;
    }
}
exports.Gun = Gun;
