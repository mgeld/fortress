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
    get name() {
        return this._name;
    }
}
exports.User = User;
