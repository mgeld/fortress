"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.latLngPointMeterLatLng = void 0;
const latLngPointMeterLatLng = (lat, long, meters, direction) => {
    const R = 6378137;
    const distRad = meters / R;
    const brngRad = direction * Math.PI / 180;
    const lat1Rad = lat * Math.PI / 180;
    const lon1Rad = long * Math.PI / 180;
    const lat2Rad = Math.asin(Math.sin(lat1Rad) * Math.cos(distRad) + Math.cos(lat1Rad) * Math.sin(distRad) * Math.cos(brngRad));
    const lon2Rad = lon1Rad + Math.atan2(Math.sin(brngRad) * Math.sin(distRad) * Math.cos(lat1Rad), Math.cos(distRad) - Math.sin(lat1Rad) * Math.sin(lat2Rad));
    const lat2 = lat2Rad * 180 / Math.PI;
    const lon2 = lon2Rad * 180 / Math.PI;
    return [lat2, lon2];
};
exports.latLngPointMeterLatLng = latLngPointMeterLatLng;
