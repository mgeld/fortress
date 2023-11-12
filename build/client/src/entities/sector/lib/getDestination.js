"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDestination = void 0;
let index = 0;
const getDestination = (lat, long, distance, bearing) => {
    index++;
    var radius = 6371e3;
    var toRadians = function (v) { return v * Math.PI / 180; };
    var toDegrees = function (v) { return v * 180 / Math.PI; };
    var δ = Number(distance) / radius;
    var θ = toRadians(Number(bearing));
    var φ1 = toRadians(Number(lat));
    var λ1 = toRadians(Number(long));
    const Δφ = δ * Math.cos(θ);
    let φ2 = φ1 + Δφ;
    const Δψ = Math.log(Math.tan(φ2 / 2 + Math.PI / 4) / Math.tan(φ1 / 2 + Math.PI / 4));
    const q = Math.abs(Δψ) > 10e-12 ? Δφ / Δψ : Math.cos(φ1);
    const Δλ = δ * Math.sin(θ) / q;
    const λ2 = λ1 + Δλ;
    if (Math.abs(φ2) > Math.PI / 2)
        φ2 = φ2 > 0 ? Math.PI - φ2 : -Math.PI - φ2;
    let n1 = toDegrees(φ2);
    let n2 = (toDegrees(λ2) + 540) % 360 - 180;
    return [n1, n2];
};
exports.getDestination = getDestination;
