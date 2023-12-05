import { TLatLng } from "../../common-types/model";

export class Areal {

    public static generator(_pos: TLatLng): number {
        const [lat, lng] = Areal.getStartArealLatLng(_pos)
        const areal = Number(String(lat * 100) + String(lng * 100))
        return areal
    }

    public static getStartArealLatLng = (_pos: TLatLng): TLatLng => {
        const lat = (_pos[0] - (_pos[0] % 0.02))
        const lng = (_pos[1] - (_pos[1] % 0.03))
        return [lat, lng]
    }

    public static getBounds(areal: TLatLng): [TLatLng, TLatLng] {
        const latlng = Areal.getStartArealLatLng(areal)
        return [
            latlng,
            [latlng[0] + 0.02, latlng[1] + 0.03],
        ]
    }

    public static getBoundsCitadel(areal: TLatLng): [TLatLng, TLatLng] {
        const latlng = Areal.getStartArealLatLng(areal)
        return [
            [latlng[0] - 0.02 - 0.02 - 0.02 - 0.02, latlng[1] - 0.03 - 0.03 - 0.03 - 0.03],
            [latlng[0] + 0.02 + 0.02 + 0.02 + 0.02 + 0.02, latlng[1] + 0.03 + 0.03 + 0.03 + 0.03 + 0.03],
        ]
    }
    
}