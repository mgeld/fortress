"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Extraction = void 0;
const units_1 = require("../units/units");
class Extraction {
    constructor(props) {
        this._level = props.level;
        this._items = props.items;
    }
    unmarshal() {
        return {
            level: this._level,
            items: this._items,
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
        if (!Extraction.validLevel(this._level + 1)) {
            throw new Error('');
        }
        this._level = this._level + 1;
        return this._level;
    }
    static validLevel(level) {
        return level > 0 && level <= 6;
    }
    static levelMaxItems() {
        return {
            1: 10,
            2: 15,
            3: 20,
            4: 25,
            5: 30,
            6: 35
        };
    }
    use(id, index) {
        this._items.splice(index, 1);
        return units_1.Units.getUnitQuantity(id);
    }
    addExtrToList(probabilityNumber) {
        this._items.push(probabilityNumber);
    }
}
exports.Extraction = Extraction;
