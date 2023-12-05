import { TLatLng } from "shared/types"

export class Areal {

    public static getArealId(_pos: TLatLng) {
        const lat = _pos[0] - (_pos[0] % 0.02)
        const long = _pos[1] - (_pos[1] % 0.03)
        const areal = String(lat) + String(long)
        return areal
    }

    private static getArealPlace(pos: TLatLng): TLatLng {
        return [
            pos[0] - (pos[0] % 0.02),
            pos[1] - (pos[1] % 0.03)
        ]
    }

    public static getBounds(areal: TLatLng): [TLatLng, TLatLng] {
        const latlng = Areal.getArealPlace(areal)
        return [
            latlng,
            [latlng[0] + 0.02, latlng[1] + 0.03],
        ]
    }

    public static getBoundsSatellite(areal: TLatLng): [TLatLng, TLatLng] {
        const latlng = Areal.getArealPlace(areal)
        return [
            [latlng[0] - 0.02 - 0.02 - 0.02 - 0.02, latlng[1] - 0.03 - 0.03 - 0.03 - 0.03],
            [latlng[0] + 0.02 + 0.02 + 0.02 + 0.02 + 0.02, latlng[1] + 0.03 + 0.03 + 0.03 + 0.03 + 0.03],
        ]
    }

}