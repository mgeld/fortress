"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debounce = void 0;
const debounce = (func, timeout = 300) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
};
exports.debounce = debounce;
