import { TLatLng, TPointer } from "../../common-types/model"
import { UnmarshalledUser, User } from "./user"

export type TPointerProps = {
    zoneId: number

    level: number

    user: User

    color: number

    health: number

    pos: TLatLng
    areal?: number

    weapons: string[]
    bombs?: string[]
}

export type UnmarshalledPointer = {
    id: number
    user: UnmarshalledUser
} & Omit<Required<TPointerProps>, 'zoneId' | 'user'>

// {
//     id: number
//     areal: number
// } & Omit<TPointerProps, 'areal'>

export class Pointer {

    // private _id: number

    private _zoneId: number
    private _level: number

    private _health: number

    private _user: User

    private _color: number

    private _weapons: string[]
    private _bombs: string[]

    private _pos: TLatLng
    private _areal: number

    private constructor(pointer: TPointerProps) {
        this._zoneId = pointer.zoneId
        this._level = pointer.level

        this._user = pointer.user

        this._color = pointer?.color || 1

        this._health = pointer.health

        this._weapons = pointer.weapons || []
        this._bombs = []

        this._pos = pointer.pos
        this._areal = pointer.areal || 0

    }

    public static create(pointer: TPointerProps) {
        const instance = new Pointer(pointer)
        return instance
    }

    public unmarshal(): UnmarshalledPointer {
        return {
            id: this._zoneId,

            level: this._level,

            user: this._user.unmarshal(),

            color: this._color,

            health: this.health,

            pos: this._pos,

            weapons: this.weapons,
            bombs: [], // ВРЕМЕННО

            areal: this.areal,
        }
    }

    public pointerUnmarshal(): TPointer {
        return {
            lvl: this._level,
            userId: this._zoneId,
            icon: this._user.icon,
            name: this._user.name,
            pos: this.pos,
            health: this.health,
        }
    }

    upLevel(): number {
        if (!Pointer.validLevel(this._level + 1)) {
            throw new Error('')
        }
        this._level = this._level + 1
        return this._level
    }


    public static validLevel(level: number) {
        return level > 0 && level <= 6
    }

    private static getLevelMaxHealth(level: number): number {
        const levels: { [key: number]: number } = {
            1: 150,
            2: 250,
            3: 360,
            4: 480,
            5: 610,
            6: 750
        }
        return levels[level]
    }

    public static getLevelUpPrice(level: number): number {
        const levels: { [key: number]: number } = {
            1: 0,
            2: 20,
            3: 40,
            4: 70,
            5: 110,
            6: 160
        }
        return levels[level]
    }

    get icon() {
        return this._user.icon
    }

    get name() {
        return this._user.name
    }

    get zoneId(): number {
        return this._zoneId
    }

    get areal(): number {
        return this._areal
    }

    get level(): number {
        return this._level
    }

    set areal(areal: number) {
        this._areal = areal
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

    set health(health: number) {
        this._health = health
    }

    addHealth(h: number): number | 'limit' {
        if (Pointer.getLevelMaxHealth(this._level) > this._health) {
            this._health = this._health + h
            return this._health
        }
        return 'limit'
    }

    removeHealth(h: number): number {
        this._health = this._health - h
        return this._health
    }

    get weapons() {
        return this._weapons
    }

}