"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.determinantBomb = void 0;
const aerial_1 = require("./aerial");
const determinantBomb = (symbol, level) => {
    if (symbol === 'aerial') {
        return aerial_1.Aerial.level(level);
    }
    else {
        throw new Error('----');
    }
};
exports.determinantBomb = determinantBomb;
