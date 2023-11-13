"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Areal = void 0;
class Areal {
    constructor(props) {
        this._zones = {};
        this._id = props.id;
        this._zones = props.zones;
    }
    create(props) {
        return new Areal(props);
    }
    unmarshal() {
        return {
            id: this._id,
            zones: this._zones
        };
    }
    addZone(zone) {
        this._zones[zone.id] = zone;
    }
    getZone(id) {
        return this._zones[id];
    }
    get id() {
        return this._id;
    }
}
exports.Areal = Areal;
