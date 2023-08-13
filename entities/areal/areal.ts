
type TZone = {
    id: number
    color: number
}

type TArealProps = {
    id: number
    zones: Record<number, TZone>
}

export class Areal {

    private _id: number

    private _zones: Record<number, TZone> = {}

    constructor(props: TArealProps) {
        this._id = props.id
        this._zones = props.zones
    }

    create(props: TArealProps) {
        return new Areal(props)
    }

    public unmarshal() {
        return {
            id: this._id,
            zones: this._zones
        }
    }

    addZone(zone: TZone) {
        this._zones[zone.id] = zone
    }

    getZone(id: number) {
        return this._zones[id]
    }

    get id() {
        return this._id
    }

}