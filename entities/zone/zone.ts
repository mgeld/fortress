export type TZoneProps = {
    id: number

    color: number

    sectors: number
    trophies: number

    coins: number
    rubies: number
}

export type UnmarshalledZone = Required<TZoneProps>


export class Zone {

    private _id: number

    private _sectors: number
    private _trophies: number

    private _coins: number
    private _rubies: number

    private _color: number

    private constructor(zone: TZoneProps) {
        this._id = zone.id

        this._sectors = zone?.sectors || 0
        this._trophies = zone?.trophies || 0

        this._coins = zone?.coins || 0
        this._rubies = zone?.rubies || 0

        this._color = zone?.color || 1
    }

    public static create(zone: TZoneProps) {
        const instance = new Zone(zone)
        return instance
    }

    public unmarshal(): UnmarshalledZone {
        return {
            id: this._id,

            color: this.color,

            sectors: this._sectors,
            trophies: this._trophies,

            coins: this._coins,
            rubies: this._rubies,
        }
    }

    addSector() {
        this._sectors = this._sectors + 1
    }

    loseSector() {
        this._sectors = this._sectors - 1
    }

    get id(): number {
        return this._id
    }

    get color() {
        return this._color
    }

    get sectors() {
        return this._sectors
    }

}