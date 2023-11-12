"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throttle = void 0;
const throttle = (fn, ms) => {
    let ready = true;
    const throttled = (...args) => {
        if (!ready)
            return;
        fn(...args);
        ready = false;
        const timer = setTimeout(() => {
            ready = true;
            clearTimeout(timer);
        }, ms);
    };
    return throttled;
};
exports.throttle = throttle;
