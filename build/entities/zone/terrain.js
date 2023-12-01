"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Terrain = void 0;
class Terrain {
    constructor(props) {
        this._level = props.level;
        this._sectors = props.sectors;
        this._defenders = props.defenders;
    }
    unmarshal() {
        return {
            level: this._level,
            sectors: this._sectors,
            defenders: this._defenders
        };
    }
    newDefender() {
        this._defenders = this._defenders + 1;
        return this._defenders;
    }
    killDefender() {
        this._defenders = this._defenders - 1;
        return this._defenders;
    }
    addSector() {
        this._sectors = this._sectors + 1;
        if (this._sectors >= Terrain.levelAllSectors()[this._level]) {
            this._level += 1;
        }
        return {
            level: this._level,
            sectors: this._sectors,
        };
    }
    loseSector() {
        this._sectors = this._sectors - 1;
    }
    static levelSectors() {
        return {
            1: 50,
            2: 150,
            3: 300,
            4: 500,
            5: 750,
            6: 1050,
            7: 1400,
            8: 1800,
            9: 2250,
            10: 2750,
            11: 3300,
            12: 3900,
        };
    }
    static levelAllSectors() {
        return {
            1: 50,
            2: 200,
            3: 500,
            4: 1000,
            5: 1750,
            6: 2800,
            7: 4200,
            8: 6000,
            9: 8250,
            10: 11000,
            11: 14300,
            12: 18200
        };
    }
    get level() {
        return this._level;
    }
    get sectors() {
        return this._sectors;
    }
}
exports.Terrain = Terrain;
