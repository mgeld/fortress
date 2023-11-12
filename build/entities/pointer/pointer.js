"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pointer = void 0;
class Pointer {
    constructor(pointer) {
        this._zoneId = pointer.zoneId;
        this._level = pointer.level;
        this._user = pointer.user;
        this._color = (pointer === null || pointer === void 0 ? void 0 : pointer.color) || 1;
        this._health = pointer.health;
        this._weapons = pointer.weapons || [];
        this._bombs = [];
        this._pos = pointer.pos;
        this._areal = pointer.areal || 0;
    }
    static create(pointer) {
        const instance = new Pointer(pointer);
        return instance;
    }
    unmarshal() {
        return {
            id: this._zoneId,
            level: this._level,
            user: this._user.unmarshal(),
            color: this._color,
            health: this.health,
            pos: this._pos,
            weapons: this.weapons,
            bombs: [],
            areal: this.areal,
        };
    }
    pointerUnmarshal() {
        return {
            lvl: this._level,
            userId: this._zoneId,
            icon: this._user.icon,
            name: this._user.name,
            pos: this.pos,
            health: this.health,
        };
    }
    upLevel() {
        if (!Pointer.validLevel(this._level + 1)) {
            throw new Error('');
        }
        this._level = this._level + 1;
        return this._level;
    }
    static validLevel(level) {
        return level > 0 && level <= 6;
    }
    static levelMaxHealth() {
        return {
            1: 150,
            2: 250,
            3: 360,
            4: 480,
            5: 610,
            6: 750
        };
    }
    static getLevelUpPrice(level) {
        const levels = {
            1: 0,
            2: 20,
            3: 40,
            4: 70,
            5: 110,
            6: 160
        };
        return levels[level];
    }
    get icon() {
        return this._user.icon;
    }
    get name() {
        return this._user.name;
    }
    get zoneId() {
        return this._zoneId;
    }
    get areal() {
        return this._areal;
    }
    get level() {
        return this._level;
    }
    set areal(areal) {
        this._areal = areal;
    }
    get pos() {
        return this._pos;
    }
    set pos(pos) {
        this._pos = pos;
    }
    get health() {
        return this._health;
    }
    set health(health) {
        this._health = health;
    }
    addHealth(h) {
        this._health = this._health + h;
        return this._health;
    }
    removeHealth(h) {
        this._health = this._health - h;
        return this._health;
    }
    get weapons() {
        return this._weapons;
    }
}
exports.Pointer = Pointer;
