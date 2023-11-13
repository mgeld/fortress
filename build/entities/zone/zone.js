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
            trophies: this._trophies,
            coins: this._coins,
            rubies: this._rubies,
            terrain: this._terrain.unmarshal(),
            rank: this._rank.unmarshal(),
            stormtrooper_corps: this._stormtrooper_corps.unmarshal(),
            hold: this._hold.unmarshal()
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
    get coins() {
        return this._coins;
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
    spendСoins(coins) {
        const nCoins = this._coins - coins;
        if (nCoins < 0) {
            return -1;
        }
        this._coins = nCoins;
        return this._coins;
    }
    addCoins(coins) {
        this._coins = this._coins + coins;
        console.log('addCoins this._coins', this._coins);
        return this._coins;
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
        this._rubies = this._rubies + rubies;
        return this._rubies;
    }
}
exports.Zone = Zone;
