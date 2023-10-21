import { TWeaponSymbol } from "../../common-types/model"

export interface WeaponType {
    name: string
    symbol: TWeaponSymbol
    level: number
    upLevel(): number
    damage: number
    distance: number
    radius: number
}

type TWeaponStatus = 'used' | 'stock'

export type UnmarshalledWeapon = {
    id: string
    weapon: number
    bullets: number
    level: number
    status: 1 | 0
}

export type TWeaponProps = {
    id: string,
    weapon: WeaponType,
    bullets: number
    status?: 1 | 0
}

type TSymbolForNumber = {
    [symbol: string]: number
}
type TNumberForSymbol = {
    [number: number]: TWeaponSymbol
}

export class Weapon {

    private _id: string
    public weapon: WeaponType
    private _bullets: number
    private _status: TWeaponStatus

    private constructor(props: TWeaponProps) {
        this._id = props.id
        this.weapon = props.weapon
        this._bullets = props.bullets
        this._status = props?.status ? 'used' : 'stock'
    }

    public static create(props: TWeaponProps) {
        return new Weapon(props)
    }

    public unmarshal(): UnmarshalledWeapon {
        return {
            id: this._id,
            weapon: this.symbolToNumber(this.weapon.symbol),
            level: this.weapon.level,
            bullets: this.bullets,
            status: this.status === 'used' ? 1 : 0
        }
    }

    symbolToNumber(symbol: TWeaponSymbol): number {
        const symbols: TSymbolForNumber = {
            'gun': 1
        }
        return symbols[symbol]
    }

    numberToSymbol(number: number): TWeaponSymbol {
        const numbers: TNumberForSymbol = {
            1: 'gun'
        }
        return numbers[number]
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

    set status(status: TWeaponStatus) {
        this._status = status
    }

    get status() {
        return this._status
    }

}
