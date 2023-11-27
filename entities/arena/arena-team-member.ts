import { TLatLng } from "../../common-types/model"

export type TTeamMember = {
    userId: number

    killed?: number // Сколько противников убито
    damage?: number // Сколько нанесено урона противнику
    sectors?: number // Сколько захвачено секторов

    pos: TLatLng

    arena: string
    arenaTeam: number
}

export type UnmarshalledMember = {
    id: string
    killed: number
    damage: number
    sectors: number
} & Omit<TTeamMember, 'killed' | 'damage'>

class Member {
    private _userId: number

    private _killed: number // Сколько убито
    private _damage: number // Сколько нанесено урона
    private _sectors: number // Сколько захвачено секторов

    private _pos: TLatLng

    private _arenaId: string
    private _arenaTeamId: number

    private constructor(props: TTeamMember) {
        this._userId = props.userId

        this._killed = props.killed || 0
        this._damage = props.damage || 0
        this._sectors = props.sectors || 0
        
        this._pos = props.pos

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

            killed: this._killed,
            damage: this._damage,
            sectors: this._sectors,

            pos: this.pos,
            
            arena: this.arena,
            arenaTeam: this.arenaTeam,
        }
    }

    pointerUnmarshal() {
        return {
            userId: this._userId,
            pos: this.pos,
        }
    }

    addKilledPointer() {
        this._killed = this._killed + 1
        return this._killed
    }

    makeDamage(damage: number) {
        this._damage = this._damage + damage
    }

    invadeSector() {
        this._sectors = this._sectors + 1
    }

    leaveArena() {
        this._arenaId = ''
        this._arenaTeamId = 0
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

    get damage() {
        return this._damage
    }

    get sectors() {
        return this._sectors
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