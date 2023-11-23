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

type TSymbolForNumber = {
    [symbol: string]: number
}
type TNumberForSymbol = {
    [number: number]: TWeaponSymbol
}


export class Gun {

    public name = 'Пушка'
    public symbol: TWeaponSymbol = 1 // gun

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
        this._distance = props?.distance || 290
        this._bullets = props?.bullets || 100
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

    private static getLevelMaxPower(level: number): number {
        const levels: { [key: number]: number } = {
            1: 30,
            2: 50,
            3: 72,
            4: 96,
            5: 122,
            6: 150
        }
        return levels[level]
    }

    private static getLevelMaxDistance(level: number): number {
        const levels: { [key: number]: number } = {
            1: 300,
            2: 350,
            3: 430,
            4: 540,
            5: 680,
            6: 850 
        }
        return levels[level]
    }

    private static getLevelMaxBullets(level: number): number {
        const levels: { [key: number]: number } = {
            1: 200,
            2: 300,
            3: 410,
            4: 530,
            5: 660,
            6: 800
        }
        return levels[level]
    }

    public static getLevelUpPrice(level: number): number {
        const levels: { [key: number]: number } = {
            1: 0,
            2: 100,
            3: 300,
            4: 600,
            5: 1000,
            6: 1500
        }
        return levels[level]
    }

    upLevel(): number {
        if (!Gun.validLevel(this._level + 1)) {
            throw new Error('')
        }
        this._level = this._level + 1
        return this._level
    }

    public static validLevel(level: number) {
        return level > 0 && level <= 6
    }

    // get damage(): number {
    //     if (this._level === 1) {
    //         return 10
    //     }
    //     if (this._level === 2) {
    //         return 15
    //     }
    //     if (this._level === 3) {
    //         return 20
    //     }
    //     if (this._level === 4) {
    //         return 25
    //     }
    //     if (this._level === 5) {
    //         return 30
    //     }
    //     return 0
    // }

    get distance() {
        return this._distance
    }

    get power() {
        return this._power
    }

    increasePower(power: number): [number, number] | 'limit' {
        const maxValueLevel = Gun.getLevelMaxPower(this._level)
        if (maxValueLevel > this._power) {
            const was_number = this._power
            const summ = was_number + power
            this._power = summ > maxValueLevel ? maxValueLevel : summ
            return [was_number, this._power]
        }
        return 'limit'
    }

    increaseDistance(dist: number): [number, number] | 'limit' {
        const maxValueLevel = Gun.getLevelMaxDistance(this._level)
        if (Gun.getLevelMaxDistance(this._level) > this._distance) {
            const was_number = this._power
            const summ = was_number + dist
            this._distance = summ > maxValueLevel ? maxValueLevel : summ

            return [was_number, this._distance]

        }
        return 'limit'
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

    // get radius(): number {
    //     if (this._level === 1) {
    //         return 10
    //     }
    //     if (this._level === 2) {
    //         return 15
    //     }
    //     if (this._level === 3) {
    //         return 20
    //     }
    //     if (this._level === 4) {
    //         return 25
    //     }
    //     if (this._level === 5) {
    //         return 30
    //     }
    //     return 0
    // }

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