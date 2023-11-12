"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gun = void 0;
class Gun {
    constructor(props) {
        this.name = 'Пушка';
        this.symbol = 1;
        this._id = props.id;
        this._level = (props === null || props === void 0 ? void 0 : props.level) || 1;
        this._power = (props === null || props === void 0 ? void 0 : props.power) || 10;
        this._distance = (props === null || props === void 0 ? void 0 : props.distance) || 510;
        this._bullets = (props === null || props === void 0 ? void 0 : props.bullets) || 200;
        this._status = (props === null || props === void 0 ? void 0 : props.status) ? 'used' : 'stock';
    }
    static create(props) {
        return new Gun(props);
    }
    unmarshal() {
        return {
            id: this._id,
            weapon: this.symbol,
            level: this._level,
            power: this._power,
            distance: this._distance,
            bullets: this._bullets,
            status: this._status === 'used' ? 1 : 0
        };
    }
    static levelMaxPower() {
        return {
            1: 30,
            2: 50,
            3: 72,
            4: 96,
            5: 122,
            6: 150
        };
    }
    static levelMaxDistance() {
        return {
            1: 250,
            2: 300,
            3: 380,
            4: 490,
            5: 630,
            6: 800
        };
    }
    static levelMaxBullets() {
        return {
            1: 200,
            2: 300,
            3: 410,
            4: 530,
            5: 660,
            6: 800
        };
    }
    static getLevelUpPrice(level) {
        const levels = {
            1: 0,
            2: 100,
            3: 300,
            4: 600,
            5: 1000,
            6: 1500
        };
        return levels[level];
    }
    upLevel() {
        if (!Gun.validLevel(this._level + 1)) {
            throw new Error('');
        }
        this._level = this._level + 1;
        return this._level;
    }
    static validLevel(level) {
        return level > 0 && level <= 6;
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
        return this._distance;
    }
    get power() {
        return this._power;
    }
    increasePower(power) {
        this._power = this._power + power;
        return this._power;
    }
    increaseDistance(dist) {
        this._distance = this._distance + dist;
        return this._distance;
    }
    get radius() {
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
    get level() {
        return this._level;
    }
    get id() {
        return this._id;
    }
    set bullets(count) {
        this._bullets = count;
    }
    get bullets() {
        return this._bullets;
    }
}
exports.Gun = Gun;
