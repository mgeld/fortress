import { TLatLng } from "../../common-types/model"

export type TTeamMember = {
    userId: number
    killed?: number // Сколько противников убито
    damage?: number // Сколько нанесено урона противнику
    pos: TLatLng
    health: number
    arena: string
    arenaTeam: number
}

export type UnmarshalledMember = {
    id: string
    killed: number
    damage: number
} & Omit<TTeamMember, 'killed' | 'damage'>

class Member {
    private _userId: number
    private _killed: number
    private _damage: number
    private _pos: TLatLng
    private _health: number

    private _arenaId: string
    private _arenaTeamId: number

    private constructor(props: TTeamMember) {
        this._userId = props.userId
        this._killed = props.killed || 0
        this._damage = props.damage || 0
        this._pos = props.pos
        this._health = props.health || 100
        this._arenaId = props.arena || ''
        this._arenaTeamId = props.arenaTeam || 0
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
        }
    }

    pointerUnmarshal() {
        return {
            userId: this._userId,
            pos: this.pos,
            health: this.health,
        }
    }

    removeHealth(damage: number): number {
        this.health = this.health - damage

        // if (this.health < 1) {
        //     this.leaveArena()
        // }

        return this.health
    }

    addKilledPointer() {
        this._killed = this._killed + 1
        return this._killed
    }

    public kill() {
        this._health = 0
    }

    leaveArena() {
        this._arenaId = ''
        this._arenaTeamId = 0
    }

    makeDamage(damage: number) {
        this._damage = this._damage + damage
    }

    get userId() {
        return this._userId
    }
    get killed() {
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

}

export {
    Member
}