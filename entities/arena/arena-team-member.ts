import { TLatLng } from "../../common-types/model"

export type TTeamMember = {
    userId: number
    killed?: number
    damage?: number
    pos: TLatLng
    health: number
    arena: string
    arenaTeam: number
    // status?: 'alive' | 'dead'
}

export type UnmarshalledMember = {
    id: string
    killed: number
    damage: number
    // status: 'alive' | 'dead'
} & Omit<TTeamMember, 'killed' | 'damage'>

class Member {
    private _userId: number
    private _killed: number
    private _damage: number
    private _pos: TLatLng
    private _health: number

    private _arenaId: string
    private _arenaTeamId: number
    
    // private _status:  'alive' | 'dead'

    private constructor(props: TTeamMember) {
        this._userId = props.userId
        this._killed = props.killed || 0
        this._damage = props.damage || 0
        this._pos = props.pos
        this._health = props.health || 100
        this._arenaId = props.arena || ''
        this._arenaTeamId = props.arenaTeam || 0
        // this._status = props.status || 'alive'
    }

    public static create(props: TTeamMember) {
        return new Member(props)
    }

    unmarshal(): UnmarshalledMember {
        return {
            id: String(this._userId),
            userId: this._userId,
            killed: this.killed,
            damage: this.damage,
            pos: this.pos,
            health: this.health,
            arena: this.arena,
            arenaTeam: this.arenaTeam,
            // status: this.status,
        }
    }

    pointerUnmarshal() {
        return {
            userId: this._userId,
            pos: this.pos,
            health: this.health,
        }
    }

    get userId() {
        return this._userId
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

    set pos(pos: TLatLng) {
        this._pos = pos
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

    exitArena() {
        this._arenaId = ''
        this._arenaTeamId = 0
    }

    get arena(): string {
        return this._arenaId
    }

    set arena(arenaId: string) {
        this._arenaId = arenaId
    }

    get arenaTeam(): number {
        return this._arenaTeamId
    }

    set arenaTeam(teamId: number) {
        this._arenaTeamId = teamId
    }

    // get status() {
    //     return this._status
    // }
}

export {
    Member
}