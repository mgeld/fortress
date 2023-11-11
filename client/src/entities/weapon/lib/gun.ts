import { TWeaponSymbol } from "@ctypes/model"

export interface WeaponType {
    name: string
    symbol: TWeaponSymbol
    level: number
    upLevel(): number
    damage: number
    distance: number
    radius: number
}

// Можно убрать всё. Наверное...
export class Gun implements WeaponType {

    public name = 'Пушка'
    public symbol: TWeaponSymbol = 1

    private _level: number
    // private _power: number
    // private _distance: number

    private constructor(lvl: number) {
        this._level = lvl
    }

    public static level(lvl: number) {
        return new Gun(lvl)
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

    get distance(): number {
        if (this._level === 1) {
            return 600
        }
        if (this._level === 2) {
            return 900
        }
        if (this._level === 3) {
            return 1200
        }
        if (this._level === 4) {
            return 1500
        }
        if (this._level === 5) {
            return 1800
        }
        return 0
    }

    get radius(): number {
        if (this._level === 1) {
            return 0.0004
        }
        if (this._level === 2) {
            return 0.0004
        }
        if (this._level === 3) {
            return 0.0004
        }
        if (this._level === 4) {
            return 0.0004
        }
        if (this._level === 5) {
            return 0.0004
        }
        return 0
    }

    get level() {
        return this._level
    }
}