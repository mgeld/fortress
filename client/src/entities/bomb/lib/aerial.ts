import { TBombSymbol } from "@ctypes/model"

export interface BombType {
    name: string
    symbol: TBombSymbol
    level: number
    upLevel(): number
    damage: number
    radius: number
}

export class Aerial implements BombType {

    public name = 'Пушка'
    public symbol: TBombSymbol = 'aerial'

    private _level: number

    private constructor(lvl: number) {
        this._level = lvl
    }

    public static level(lvl: number) {
        return new Aerial(lvl)
    }

    upLevel(): number {
        if (!Aerial.validLevel(this._level + 1)) {
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

    get radius(): number {
        if (this._level === 1) {
            return 60
        }
        if (this._level === 2) {
            return 80
        }
        if (this._level === 3) {
            return 100
        }
        if (this._level === 4) {
            return 120
        }
        if (this._level === 5) {
            return 140
        }
        return 0
    }

    get level() {
        return this._level
    }
}