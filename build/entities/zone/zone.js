"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Zone = void 0;
class Zone {
    constructor(zone) {
        this._id = zone.id || 0;
        this._trophies = zone.trophies;
        this._coins = zone.coins;
        this._rubies = zone.rubies;
        this._color = (zone === null || zone === void 0 ? void 0 : zone.color) || 1;
        this._description = (zone === null || zone === void 0 ? void 0 : zone.description) || '';
        this._rank = zone.rank;
        this._terrain = zone.terrain;
        this._stormtrooper_corps = zone.stormtrooper_corps;
        this._hold = zone.hold;
    }
    static create(zone) {
        const instance = new Zone(zone);
        return instance;
    }
    unmarshal() {
        return {
            id: this._id,
            color: this.color,
            description: this._description,
            trophies: this._trophies,
            coins: this._coins,
            rubies: this._rubies,
            terrain: this._terrain.unmarshal(),
            rank: this._rank.unmarshal(),
            stormtrooper_corps: this._stormtrooper_corps.unmarshal(),
            hold: this._hold.unmarshal(),
        };
    }
    get id() {
        return this._id;
    }
    set id(id) {
        this._id = id;
    }
    get color() {
        return this._color;
    }
    set color(c) {
        if (c > 0 && c <= 6) {
            this._color = c;
        }
    }
    get description() {
        return this._description;
    }
    set description(d) {
        if (d.length >= 0 && d.length <= 100) {
            this._description = d;
        }
    }
    get coins() {
        return this._coins;
    }
    get trophies() {
        return this._trophies;
    }
    get rubies() {
        return this._rubies;
    }
    get rank() {
        return this._rank;
    }
    get terrain() {
        return this._terrain;
    }
    get stormtrooper_corps() {
        return this._stormtrooper_corps;
    }
    get hold() {
        return this._hold;
    }
    setTrophies(trophy) {
        let nTrophies = this._trophies + trophy;
        if (nTrophies < 0) {
            nTrophies = 0;
        }
        this._trophies = nTrophies;
        return this._trophies;
    }
    spendСoins(coins) {
        const nCoins = this._coins - coins;
        if (nCoins < 0) {
            return -1;
        }
        this._coins = nCoins;
        return this._coins;
    }
    addCoins(coins) {
        const was_number = this._coins;
        const summ = was_number + coins;
        this._coins = summ;
        return [was_number, this._coins];
    }
    spendRubies(rubies) {
        const nRubies = this._rubies - rubies;
        if (nRubies < 0) {
            return -1;
        }
        this._rubies = nRubies;
        return this._rubies;
    }
    addRubies(rubies) {
        const was_number = this._rubies;
        const summ = was_number + rubies;
        this._rubies = summ;
        return [was_number, this._rubies];
    }
}
exports.Zone = Zone;
