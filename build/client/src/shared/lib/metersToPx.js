"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metersToPx = void 0;
const metersPerPixel = function (latitude, zoomLevel) {
    var earthCircumference = 40075017;
    var latitudeRadians = latitude * (Math.PI / 180);
    return earthCircumference * Math.cos(latitudeRadians) / Math.pow(2, zoomLevel + 8);
};
const metersToPx = function (latitude, meters, zoomLevel) {
    return meters / metersPerPixel(latitude, zoomLevel);
};
exports.metersToPx = metersToPx;
