"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Areal = void 0;
class Areal {
    static generator(_pos) {
        const [lat, lng] = Areal.getStartArealLatLng(_pos);
        const areal = Number(String(lat * 100) + String(lng * 100));
        return areal;
    }
    static getBounds(areal) {
        const latlng = Areal.getStartArealLatLng(areal);
        return [
            latlng,
            [latlng[0] + 0.02, latlng[1] + 0.03],
        ];
    }
    static getBoundsSatellite(areal) {
        const latlng = Areal.getStartArealLatLng(areal);
        return [
            [latlng[0] - 0.02 - 0.02 - 0.02 - 0.02, latlng[1] - 0.03 - 0.03 - 0.03 - 0.03],
            [latlng[0] + 0.02 + 0.02 + 0.02 + 0.02 + 0.02, latlng[1] + 0.03 + 0.03 + 0.03 + 0.03 + 0.03],
        ];
    }
}
Areal.getStartArealLatLng = (_pos) => {
    const lat = (_pos[0] - (_pos[0] % 0.02));
    const lng = (_pos[1] - (_pos[1] % 0.03));
    return [lat, lng];
};
exports.Areal = Areal;
