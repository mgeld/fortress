import { TWeaponSymbol } from "../../common-types/model"
import { TWeaponProps, TWeaponStatus, UnmarshalledWeapon } from "./types"

// export type TGunProps = {
//     level: number
//     power: number
//     distance: number
// }

// export type UnmarshalledGun = {
//     id: string
//     bullets: number
//     level: number
//     power: number
//     distance: number
//     status: 1 | 0
// }

export class Gun {

    public name = 'Пушка'
    public symbol: TWeaponSymbol = 'gun'

    private _id: string
    private _level: number

    private _power: number
    private _distance: number

    private _bullets: number
    private _status: TWeaponStatus

    private constructor(props: TWeaponProps) {
        this._id = props.id
        this._level = props?.level || 1

        this._power = props?.power || 10
        this._distance = props?.distance || 510
        this._bullets = props?.bullets || 200
        this._status = props?.status ? 'used' : 'stock'
    }

    public static create(props: TWeaponProps) {
        return new Gun(props)
    }

    public unmarshal(): UnmarshalledWeapon {
        return {
            id: this._id,
            weapon: this.symbol,
            level: this._level,
            power: this._power,
            distance: this._distance,
            bullets: this._bullets,
            status: this._status === 'used' ? 1 : 0
        }
    }

    upLevel(): number {
        if (!Gun.validLevel(this._level + 1)) {
            throw new Error('')
        }
        this._level = this._level + 1
        return this._level
    }

    public static validLevel(level: number) {
        return level > 0 && level <= 5
    }

    get damage(): number {
        if (this._level === 1) {
            return 10
        }
        if (this._level === 2) {
            return 15
        }
        if (this._level === 3) {
            return 20
        }
        if (this._level === 4) {
            return 25
        }
        if (this._level === 5) {
            return 30
        }
        return 0
    }

    get distance() {
        return this._distance
    }

    get power() {
        return this._power
    }

    increasePower(power: number): number {
        this._power = this._power + power
        return this._power
    }

    increaseDistance(dist: number): number {
        this._distance = this._distance + dist
        return this._distance
    }

    // get distance(): number {
    //     if (this._level === 1) {
    //         return 300
    //     }
    //     if (this._level === 2) {
    //         return 300
    //     }
    //     if (this._level === 3) {
    //         return 300
    //     }
    //     if (this._level === 4) {
    //         return 300
    //     }
    //     if (this._level === 5) {
    //         return 300
    //     }
    //     return 0
    // }

    get radius(): number {
        if (this._level === 1) {
            return 10
        }
        if (this._level === 2) {
            return 15
        }
        if (this._level === 3) {
            return 20
        }
        if (this._level === 4) {
            return 25
        }
        if (this._level === 5) {
            return 30
        }
        return 0
    }

    get level() {
        return this._level
    }

    get id() {
        return this._id
    }

    set bullets(count: number) {
        this._bullets = count
    }

    get bullets() {
        return this._bullets
    }

}


// let gun = Weapon.create(Gun.level(1), 1, 100)

// gun.weapon.upLevel()