import { TLatLng } from "../../common-types/model"
import { ArenaPlace } from "./arena-place"
import { Team, UnmarshalledTeam } from "./arena-team"
import { Member } from "./arena-team-member"

export type TRegistr = 'open' | 'close'
type TArenaStatus = 'pending' | 'start' | 'over'

export type TArenaProps = {
    id: string
    place: ArenaPlace
    registr: TRegistr
    status: TArenaStatus
    teams: Team[]
    // pointers?: number[]
}

export type UnmarshalledArena = {
    teams: UnmarshalledTeam[]
    place: TLatLng
} & Omit<TArenaProps, 'teams' | 'place'>

// pointers: number[]
// pointers: UnmarshalledPointer[]

export class Arena {

    // _pointers: Map<number, Pointer> = new Map()
    // private _arenaPointers: number[]

    private _id: string

    private _place: ArenaPlace
    private _registr: TRegistr // открыта ли вступление на арену
    private _status: TArenaStatus

    private _teamList: Team[] = []

    private _teamsNumber: number = 2
    private _teamMembersNumber: number = 2

    private constructor(arena: TArenaProps) {

        this._id = arena.id
        this._place = arena.place
        this._registr = arena.registr
        this._status = arena.status

        this._teamList = arena.teams
        // || this.createTeams()

        // this._arenaPointers = arena.pointers || []
    }

    public static create(arena: TArenaProps) {
        const instance = new Arena(arena)
        return instance
    }

    public battleStart() {
        this._registr = 'close'
        this._status = "start"
    }

    public unmarshal(): UnmarshalledArena {
        return {
            id: this._id,
            place: this._place.place,
            registr: this.registr,
            status: this._status,
            teams: this._teamList.map(team => team.unmarshal())
            // pointers: this.pointers
            // pointers: mapToArray<Pointer>(this.pointers).map(item => item.unmarshal())
        }
    }

    isFullTeams(): boolean {
        return this.teamList.every(team => team.getMembersNumber() === this._teamMembersNumber)
    }

    addPointer(pointer: number): Team {
        const team = this._teamList.find(team => team.getMembersNumber() < this._teamMembersNumber)
        // const team = this._teamList.filter(team => {
        //     if (team.getMembersNumber() < this._teamMembersNumber) {
        //         team.addPointer(pointer)
        //         return 
        //     }
        // })
        if(team instanceof Team) {
            team.addPointer(pointer)
            return team
        }

        throw new Error('ssdsdsd')
        // let is_add = false
        // this.teams = this.teams.map(team => {
        //     if (!is_add && team.pointers.length < this._teamMembersNumber) {
        //         is_add = true
        //         return {
        //             ...team,
        //             pointers: [...team.pointers, pointerId]
        //         }
        //     }
        //     return team
        // })
        // return is_add
    }

    killPointer(pointerId: number, teamId: number): Team {
        const team = this.teamList.filter(team => {
            if (team.id === teamId) {
                team.members.forEach(member => {
                    if (member === pointerId) {
                        // member.kill()
                        team.killTeamMember()
                    }
                })
                return true
            }
        })

        try {
            return team[0]
        } catch(e) {
            throw new Error('======')
        }

        // let killPointerTeam: Team | null = null

        // this.teams = this.teams.map(team => {
        //     const pointers = team.pointers.filter(pointer => pointer !== pointerId)

        //     if (pointers.length === 0) {
        //         killPointerTeam = team
        //     }
        //     return {
        //         ...team,
        //         // status: pointers.length === 0 ? 'defeat' : team.status,
        //         pointers
        //     }
        // })
        // return (killPointerTeam as unknown) as TTeam
    }

    // Метод не используется нигде. Возможно когда-нибудь пригодится. А может и нетв
    addPointerToTeam(pointerId: number, teamId: number) {
        // this.teams = this.teams.map(team => {
        //     if (team.teamId === teamId) {
        //         return {
        //             ...team,
        //             pointers: [...team.pointers, pointerId]
        //         }
        //     }
        //     return team
        // })
    }

    // createTeams(): Team[] {
    // return new Array(this._teamsNumber).map((_, index) =>
    //     Team.create({
    //         teamId: index + 1,
    //         status: 'default',
    //         pointers: []
    //     })
    // )
    // }

    get pointers(): number[] {
        let pointers: number[] = []
        this.teamList.forEach(team => {
            pointers = [...pointers, ...team.members.map(member => member)]
        })
        return pointers
    }

    // set pointers(p: number[]) {
    //     this._arenaPointers = p
    // }

    get teamList() {
        return this._teamList
    }

    // get pointers(): number[] {
    //     let pointers: number[] = []
    //     this.teams.forEach(team => {
    //         pointers = [...pointers, ...team.pointers]
    //     })
    //     return pointers
    // }

    // set teams(t: TTeam[]) {
    //     this._teams = t
    // }

    get id() {
        return this._id
    }

    get place() {
        return this._place
    }

    get registr() {
        return this._registr
    }

    get status() {
        return this._status
    }

}