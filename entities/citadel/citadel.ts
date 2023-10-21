import { TLatLng } from "../../common-types/model"

export type TCitadelProps = {
    id: number
    sectorId: string
    latlng: TLatLng
    level: number
}

export type UnmarshalledCitadel = TCitadelProps

export class Citadel {
    private _zoneId: number
    private _sectorId: string
    private _latlng: TLatLng
    private _level: number

    constructor(props: TCitadelProps) {
        this._zoneId = props.id
        this._sectorId = props.sectorId
        this._latlng = props.latlng
        this._level = props.level
    }

    public static create(props: TCitadelProps) {
        return new Citadel(props)
    }

    unmarshal(): UnmarshalledCitadel {
        return {
            id: this._zoneId,
            sectorId: this._sectorId,
            latlng: this._latlng,
            level: this._level
        }
    }

    get id() {
        return this._zoneId
    }

    get sectorId() {
        return this._sectorId
    }

    get latlng() {
        return this._latlng
    }

    get level() {
        return this._level
    }

}