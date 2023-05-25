import { TLatLng } from "../../common-types/model";

export class Sector {
    constructor(
        private _pos: TLatLng
    ) {}

    get sector() {
        return Sector.generator(this._pos)
    }

    public static generator(_pos: TLatLng) {
        const lat = Number(_pos[0].toFixed(2)) * 100
        const long = Number(_pos[1].toFixed(2)) * 100
        const sector = String(lat) + String(long)
        return sector
    }
}