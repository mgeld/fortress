"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.numberToSymbol = exports.symbolToNumber = void 0;
const symbolToNumber = (symbol) => {
    const symbols = {
        'aerial': 1
    };
    return symbols[symbol];
};
exports.symbolToNumber = symbolToNumber;
const numberToSymbol = (number) => {
    const numbers = {
        1: 'aerial'
    };
    return numbers[number];
};
exports.numberToSymbol = numberToSymbol;
