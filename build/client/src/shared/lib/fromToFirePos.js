"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromToFirePos = void 0;
const latLngPointMeterLatLng_1 = require("./latLngPointMeterLatLng");
const fromToFirePos = (position, angle, meters) => {
    console.log('-----------------angle', angle);
    return (0, latLngPointMeterLatLng_1.latLngPointMeterLatLng)(position[0], position[1], meters, angle);
};
exports.fromToFirePos = fromToFirePos;
