"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Areal = void 0;
class Areal {
    constructor(id) {
        this._pointers = [];
        this._id = id;
    }
    create({ id }) {
        return new Areal(id);
    }
    addPointer(pointerId) {
        this._pointers.push(pointerId);
    }
    delPointer(pointerId) {
        this._pointers = this._pointers.filter(pointer => pointer !== pointerId);
    }
    clearPointers() {
        this._pointers = [];
    }
    get pointers() {
        return this._pointers;
    }
    get id() {
        return this._id;
    }
}
exports.Areal = Areal;
