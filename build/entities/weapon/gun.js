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
    static getLevelMaxPower(level) {
        const levels = {
            1: 30,
            2: 50,
            3: 72,
            4: 96,
            5: 122,
            6: 150
        };
        return levels[level];
    }
    static getLevelMaxDistance(level) {
        const levels = {
            1: 250,
            2: 300,
            3: 380,
            4: 490,
            5: 630,
            6: 800
        };
        return levels[level];
    }
    static getLevelMaxBullets(level) {
        const levels = {
            1: 200,
            2: 300,
            3: 410,
            4: 530,
            5: 660,
            6: 800
        };
        return levels[level];
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
    get distance() {
        return this._distance;
    }
    get power() {
        return this._power;
    }
    increasePower(power) {
        const maxValueLevel = Gun.getLevelMaxPower(this._level);
        if (maxValueLevel > this._power) {
            const summ = this._power + power;
            this._power = summ > maxValueLevel ? maxValueLevel : summ;
            return this._power;
        }
        return 'limit';
    }
    increaseDistance(dist) {
        const maxValueLevel = Gun.getLevelMaxDistance(this._level);
        if (Gun.getLevelMaxDistance(this._level) > this._distance) {
            const summ = this._distance + dist;
            this._distance = summ > maxValueLevel ? maxValueLevel : summ;
            return this._distance;
        }
        return 'limit';
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
