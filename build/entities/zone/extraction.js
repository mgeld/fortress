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
            2: 504,
            3: 2052,
            4: 4626,
            5: 8226,
            6: 12852
        };
        return levels[level];
    }
    upLevel(limit) {
        if (!Extraction.validLevel(this._level + 1, limit)) {
            return 'limit';
        }
        this._level = this._level + 1;
        return this._level;
    }
    static validLevel(level, limit) {
        return level > 0 && level <= limit;
    }
    static getLevelMaxItems(level) {
        const levels = {
            1: 10,
            2: 15,
            3: 25,
            4: 40,
            5: 60,
            6: 85
        };
        return levels[level];
    }
    use(id, index) {
        const items = this._items.slice();
        if (items[index] === id) {
            items.splice(index, 1);
            this._items = items;
            return units_1.Units.getUnitQuantity(id);
        }
        return null;
    }
    delExtr(id, index) {
        const items = this._items.slice();
        if (items[index] === id) {
            items.splice(index, 1);
            this._items = items;
            return true;
        }
        return false;
    }
    addExtrToList(probabilityNumber) {
        const maxValueLevel = Extraction.getLevelMaxItems(this._level);
        if (this._items.length + 1 <= maxValueLevel) {
            this._items.unshift(probabilityNumber);
            return probabilityNumber;
        }
        return 'limit';
    }
}
exports.Extraction = Extraction;
