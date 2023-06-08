import { TLatLng } from "shared/types"

export class Areal {

    public static getArealId(_pos: TLatLng) {
        const lat = Math.floor(_pos[0] * 100) / 100
        const long = Math.floor(_pos[1] * 100) / 100
        const areal = String(lat) + String(long)
        return areal
    }

    private static getArealPlace(pos: TLatLng): TLatLng {
        return [
            Math.floor(pos[0] * 100) / 100,
            Math.floor(pos[1] * 100) / 100,
        ]
    }

    public static getBounds(areal: TLatLng): [TLatLng, TLatLng] {
        const latlng = Areal.getArealPlace(areal)
        return [
            latlng,
            [latlng[0] + 0.01, latlng[1] + 0.01]
        ]
    }

}