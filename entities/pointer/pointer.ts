import { TLatLng } from "../../common-types/model"

export type TPointerProps = {
    id: number
    zoneId: number

    icon?: string
    name?: string
    color: number
    health: number

    // sectors: number
    // trophies: number

    // coins: number
    // rubies: number

    invaders: number
    defenders: number

    pos: TLatLng
    areal?: number
    weapons?: string[]
}

export type UnmarshalledPointer = Required<TPointerProps>

// {
//     id: number
//     areal: number
// } & Omit<TPointerProps, 'areal'>

export class Pointer {

    private _id: number

    private _zoneId: number

    private _health: number

    private _icon: string
    private _name: string

    // private _sectors: number
    // private _trophies: number

    // private _coins: number
    // private _rubies: number

    private _color: number

    private _invaders: number
    private _defenders: number

    private _weapons: string[]

    private _pos: TLatLng
    private _areal: number

    private constructor(pointer: TPointerProps) {
        this._id = pointer.id
        this._zoneId = pointer.zoneId

        this._icon = pointer?.icon || ''
        this._name = pointer?.name || ''

        // this._sectors = pointer?.sectors || 0
        // this._trophies = pointer?.trophies || 0

        // this._coins = pointer?.coins || 0
        // this._rubies = pointer?.rubies || 0

        console.log('Pointer create pointer?.color', pointer?.color)

        this._color = pointer?.color || 1

        this._health = pointer.health

        this._invaders = pointer.invaders
        this._defenders = pointer.defenders

        this._weapons = pointer.weapons || []

        this._pos = pointer.pos
        this._areal = pointer.areal || 0
    }

    public static create(pointer: TPointerProps) {
        const instance = new Pointer(pointer)
        return instance
    }

    public unmarshal(): UnmarshalledPointer {
        return {
            id: this._id,

            zoneId: this._zoneId,
            health: this.health,
            color: this.color,
            icon: this._icon,
            name: this._name,
            // sectors: this._sectors,
            // trophies: this._trophies,
            // coins: this._coins,
            // rubies: this._rubies,

            invaders: this.invaders,
            defenders: this.defenders,

            pos: this.pos,

            weapons: this.weapons,

            areal: this.areal,
        }
    }

    public pointerUnmarshal() {
        return {
            userId: this._id,
            pos: this.pos,
            health: this.health,
        }
    }

    // addSector() {
    //     this._sectors = this._sectors + 1
    // }

    // loseSector() {
    //     this._sectors = this._sectors - 1
    // }

    killInvader(): number {
        this._invaders = this._invaders - 1
        return this._invaders
    }

    get id(): number {
        return this._id
    }

    get areal(): number {
        return this._areal
    }

    set areal(areal: number) {
        this._areal = areal
    }

    get zoneId(): number {
        return this._zoneId
    }

    get pos() {
        return this._pos
    }

    set pos(pos: TLatLng) {
        this._pos = pos
    }

    get health() {
        return this._health
    }

    get color() {
        return this._color
    }

    get invaders() {
        return this._invaders
    }

    get defenders() {
        return this._defenders
    }

    set health(health: number) {
        this._health = health
    }

    get weapons() {
        return this._weapons
    }

}