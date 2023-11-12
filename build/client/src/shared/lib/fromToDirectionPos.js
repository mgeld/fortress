"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromToDirectionPos = void 0;
const latLngPointMeterLatLng_1 = require("./latLngPointMeterLatLng");
const fromToDirectionPos = (position, direction, meters) => {
    switch (direction) {
        case 'FORWARD':
            return (0, latLngPointMeterLatLng_1.latLngPointMeterLatLng)(position[0], position[1], meters, 360);
        case 'BACKWARD':
            return (0, latLngPointMeterLatLng_1.latLngPointMeterLatLng)(position[0], position[1], meters, 180);
        case 'RIGHT':
            return (0, latLngPointMeterLatLng_1.latLngPointMeterLatLng)(position[0], position[1], meters, 90);
        default:
            return (0, latLngPointMeterLatLng_1.latLngPointMeterLatLng)(position[0], position[1], meters, 270);
    }
};
exports.fromToDirectionPos = fromToDirectionPos;
