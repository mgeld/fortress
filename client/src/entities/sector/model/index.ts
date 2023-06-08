import { TLatLng } from "shared/types"

export class Sector {

    public static getSectorId(_pos: TLatLng) {
        const lat = Math.floor(_pos[0] / 1000) * 1000
        const long = Math.floor(_pos[1] / 1000) * 1000
        const sector = String(lat) + String(long)
        return sector
    }

    private static getArealPlace(pos: TLatLng): TLatLng {
        return [
            Math.floor(pos[0] * 100) / 100,
            Math.floor(pos[1] * 100) / 100,
        ]
    }

    public static getBounds(sector: TLatLng): [TLatLng, TLatLng] {
        const latlng = Sector.getArealPlace(sector)
        return [
            latlng,
            [latlng[0] + 0.01, latlng[1] + 0.01]
        ]
    }

}