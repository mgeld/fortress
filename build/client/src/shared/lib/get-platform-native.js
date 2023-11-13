"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlatformNative = void 0;
var userDeviceArray = [
    { device: 'android', platform: /Android/ },
    { device: 'iphone', platform: /iPhone/ },
];
var platform = navigator.userAgent;
const getPlatformNative = () => {
    for (var i in userDeviceArray) {
        if (userDeviceArray[i].platform.test(platform)) {
            return userDeviceArray[i].device;
        }
    }
};
exports.getPlatformNative = getPlatformNative;
