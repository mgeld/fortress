"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GunFire = void 0;
const fromToDirectionPos_1 = require("shared/lib/fromToDirectionPos");
const isHitFireTarget_1 = require("shared/lib/isHitFireTarget");
class GunFire {
    constructor() {
        this.fromPos = [0, 0];
        this.toPos = [0, 0];
        this.distance = 0;
        this.direction = null;
        this.fireId = 0;
        this.fireId = Date.now();
    }
    getToPosLatLng(position, direction, distance) {
        this.fromPos = position;
        this.distance = distance;
        this.direction = direction;
        this.toPos = (0, fromToDirectionPos_1.fromToDirectionPos)(this.fromPos, this.direction, this.distance);
    }
    hitFireTarget(position) {
        return (0, isHitFireTarget_1.isHitFireTarget)({
            from: this.fromPos,
            to: this.toPos,
            marker: position,
            radius: 0.0004,
            direction: this.direction,
        });
    }
}
exports.GunFire = GunFire;
