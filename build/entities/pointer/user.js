"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(user) {
        this._icon = user.icon;
        this._name = user.name;
    }
    static create(user) {
        const instance = new User(user);
        return instance;
    }
    unmarshal() {
        return {
            icon: this._icon,
            name: this._name,
        };
    }
    get icon() {
        return this._icon;
    }
    set icon(i) {
        this._icon = i;
    }
    get name() {
        return this._name;
    }
    set name(n) {
        if (n.trim().length >= 3 && n.trim().length <= 12) {
            this._name = n;
        }
    }
}
exports.User = User;
