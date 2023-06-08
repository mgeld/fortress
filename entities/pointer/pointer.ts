import { TLatLng } from "../../common-types/model"

export type TPointerProps = {
    // id: number
    // icon: string
    userId: number
    health: number
    pos: TLatLng
    areal?: string
    // arena?: string
    // arenaTeam?: number
    weapons?: string[]
}

export type UnmarshalledPointer = {
    id: string
    areal: string
} & Omit<TPointerProps, 'areal'>

export class Pointer {

    // private _id: string
    // private _icon: string

    private _userId: number
    private _health: number

    private _pos: TLatLng

    private _weapons: string[]

    // private _arenaId: string
    // private _arenaTeamId: number
    private _areal: string

    private constructor(pointer: TPointerProps) {
        this._userId = pointer.userId
        this._health = pointer.health
        this._pos = pointer.pos

        this._weapons = pointer.weapons || []

        // this._id = pointer.id
        // this._icon = pointer.icon

        this._areal = pointer.areal || ''
        // this._arenaId = pointer.arena || ''
        // this._arenaTeamId = pointer.arenaTeam || 0
    }

    public static create(pointer: TPointerProps) {
        const instance = new Pointer(pointer)
        return instance
    }

    public unmarshal(): UnmarshalledPointer {
        return {
            id: String(this.userId),
            userId: this.userId,
            pos: this.pos,
            health: this.health,

            weapons: this.weapons,

            areal: this.areal,
            
            // arena: this.arena,
            // arenaTeam: this.arenaTeam,
            // icon: this.icon
        }
    }

    // exitArena() {
    //     this._arenaId = ''
    //     this._arenaTeamId = 0
    // }

    // get arena(): string {
    //     return this._arenaId
    // }

    // set arena(arenaId: string) {
    //     this._arenaId = arenaId
    // }

    // get arenaTeam(): number {
    //     return this._arenaTeamId
    // }

    // set arenaTeam(teamId: number) {
    //     this._arenaTeamId = teamId
    // }


    get areal(): string {
        return this._areal
    }

    set areal(areal: string) {
        this._areal = areal
    }

    get userId(): number {
        return this._userId
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

    get weapons() {
        return this._weapons
    }

    // get icon() {
    //     return this._icon
    // }

}