"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Citadel = void 0;
class Citadel {
    constructor(props) {
        this._zoneId = props.id;
        this._sectorId = props.sectorId;
        this._latlng = props.latlng;
        this._level = props.level;
    }
    static create(props) {
        return new Citadel(props);
    }
    unmarshal() {
        return {
            id: this._zoneId,
            sectorId: this._sectorId,
            latlng: this._latlng,
            level: this._level
        };
    }
    get id() {
        return this._zoneId;
    }
    get sectorId() {
        return this._sectorId;
    }
    get latlng() {
        return this._latlng;
    }
    get level() {
        return this._level;
    }
}
exports.Citadel = Citadel;
