import { TLatLng } from "../../common-types/model";

export class Areal {
    constructor(
        private _pos: TLatLng
    ) {}

    get areal() {
        return Areal.generator(this._pos)
    }

    // public static generator(_pos: TLatLng) {
    //     const lat = Number(_pos[0].toFixed(2)) * 100
    //     const long = Number(_pos[1].toFixed(2)) * 100
    //     const areal = String(lat) + String(long)
    //     return areal
    // }

    public static generator(_pos: TLatLng) {
        const lat = Math.floor(_pos[0] * 100) / 100
        const long = Math.floor(_pos[1] * 100) / 100
        const areal = String(lat) + String(long)
        return areal
    }

}