import { TLatLng } from "../../common-types/model"

export type TTeamMember = {
    pointerId: number
    killed?: number
    damage?: number
    pos: TLatLng
    health: number
    // status?: 'alive' | 'dead'
}

type UnmarshalledMember = {
    killed: number
    damage: number
    // status: 'alive' | 'dead'
} & Omit<TTeamMember, 'killed' | 'damage'>

class Member {
    private _pointerId: number
    private _killed: number
    private _damage: number
    private _pos: TLatLng
    private _health: number
    // private _status:  'alive' | 'dead'

    private constructor(props: TTeamMember) {
        this._pointerId = props.pointerId
        this._killed = props.killed || 0
        this._damage = props.damage || 0
        this._pos = props.pos
        this._health = props.health || 100
        // this._status = props.status || 'alive'
    }

    public static create(props: TTeamMember) {
        return new Member(props)
    }

    unmarshal(): UnmarshalledMember {
        return {
            pointerId: this._pointerId,
            killed: this.killed,
            damage: this.damage,
            pos: this.pos,
            health: this.health,
            // status: this.status,
        }
    }

    get pointerId() {
        return this._pointerId
    }

    public kill() {
        // this._status = 'dead'
        this._health = 0
    }

    get killed() {
        return this._killed
    }

    addKilledPointer() {
        this._killed = this._killed + 1
        return this._killed
    }

    get pos() {
        return this._pos
    }

    get health() {
        return this._health
    }

    set health(health: number) {
        this._health = health
    }

    get damage() {
        return this._damage
    }

    set damage(damage: number) {
        this._damage = damage
    }

    // get status() {
    //     return this._status
    // }
}

export {
    Member
}