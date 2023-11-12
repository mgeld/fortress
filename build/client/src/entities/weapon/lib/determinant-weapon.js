"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.determinantWeapon = void 0;
const gun_1 = require("./gun");
const determinantWeapon = (symbol, level) => {
    if (symbol === 1) {
        return gun_1.Gun.level(level);
    }
    else {
        throw new Error('----');
    }
};
exports.determinantWeapon = determinantWeapon;
