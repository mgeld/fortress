"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Areal = void 0;
class Areal {
    static getArealId(_pos) {
        const lat = _pos[0] - (_pos[0] % 0.02);
        const long = _pos[1] - (_pos[1] % 0.03);
        const areal = String(lat) + String(long);
        return areal;
    }
    static getAreals(_pos) {
        const [lat, lng] = Areal.getArealPlace(_pos);
        const areals = [
            [lat + 0.02, lng - 0.03],
            [lat + 0.02, lng],
            [lat + 0.02, lng + 0.03],
            [lat, lng - 0.03],
            [lat, lng],
            [lat, lng + 0.03],
            [lat - 0.02, lng - 0.03],
            [lat - 0.02, lng],
            [lat - 0.02, lng + 0.03],
        ];
        return areals.map(latlng => Number(String(Math.round(latlng[0] * 100)) + String(Math.round(latlng[1] * 100))));
    }
    static getArealPlace(pos) {
        return [
            pos[0] - (pos[0] % 0.02),
            pos[1] - (pos[1] % 0.03)
        ];
    }
    static getBounds(areal) {
        const latlng = Areal.getArealPlace(areal);
        return [
            latlng,
            [latlng[0] + 0.02, latlng[1] + 0.03],
        ];
    }
    static getBoundsSatellite(areal) {
        const latlng = Areal.getArealPlace(areal);
        return [
            [latlng[0] - 0.02 - 0.02 - 0.02 - 0.02, latlng[1] - 0.03 - 0.03 - 0.03 - 0.03],
            [latlng[0] + 0.02 + 0.02 + 0.02 + 0.02 + 0.02, latlng[1] + 0.03 + 0.03 + 0.03 + 0.03 + 0.03],
        ];
    }
}
exports.Areal = Areal;
