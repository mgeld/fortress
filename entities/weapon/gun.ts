import { TWeaponSymbol } from "../../common-types/model"
import { Weapon, WeaponType } from "./weapon"

export class Gun implements WeaponType {

    public name = 'Пушка'
    public symbol: TWeaponSymbol = 'gun'

    private _level: number

    private constructor(lvl: number) {
        this._level = lvl
    }

    public static level(lvl: number) {
        return new Gun(lvl)
    }

    upLevel(): number {
        if(!Gun.validLevel(this._level + 1)) {
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

    get distance(): number {
        if (this._level === 1) {
            return 300
        }
        if (this._level === 2) {
            return 300
        }
        if (this._level === 3) {
            return 300
        }
        if (this._level === 4) {
            return 300
        }
        if (this._level === 5) {
            return 300
        }
        return 0
    }

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
}


// let gun = Weapon.create(Gun.level(1), 1, 100)

// gun.weapon.upLevel()