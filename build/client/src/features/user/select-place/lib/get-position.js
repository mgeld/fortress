"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPosition = void 0;
const getPosition = () => {
    return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(position => {
            res([
                position.coords.latitude,
                position.coords.longitude,
            ]);
        }, e => {
            res([0, 0]);
        });
    });
};
exports.getPosition = getPosition;
