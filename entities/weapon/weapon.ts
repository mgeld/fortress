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

type TWeaponStatus =  'used' | 'stock'

export type UnmarshalledWeapon = {
    id: string
    weapon: TWeaponSymbol
    bullets: number
    level: number
    status:TWeaponStatus
}

export type TWeaponProps = {
    weapon: WeaponType,
    id: string,
    bullets: number
    status?: TWeaponStatus
}

export class Weapon {

    private _id: string
    public weapon: WeaponType
    private _bullets: number
    private _status: TWeaponStatus

    private constructor(props: TWeaponProps) {
        this.weapon = props.weapon
        this._id = props.id
        this._bullets = props.bullets
        this._status = props?.status || 'stock'
    }

    public static create(props: TWeaponProps) {
        return new Weapon(props)
    }

    public unmarshal(): UnmarshalledWeapon {
        return {
            id: this._id,
            weapon: this.weapon.symbol,
            level: this.weapon.level,
            bullets: this.bullets,
            status: this.status
        }
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
