import { TLatLng } from "shared/types"

export class Areal {

    public static getArealId(_pos: TLatLng) {
        const lat = _pos[0] - (_pos[0] % 0.02)
        const long = _pos[1] - (_pos[1] % 0.03)
        const areal = String(lat) + String(long)
        return areal
    }

    public static getAreals(_pos: TLatLng): number[] {
        const [lat, lng] = Areal.getArealPlace(_pos)

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
        ]

        return areals.map(latlng => Number(String(Math.round(latlng[0] * 100)) + String(Math.round(latlng[1] * 100))))

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