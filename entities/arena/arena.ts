import { TLatLng } from "../../common-types/model"
import { ArenaPlace } from "./arena-place"
import { Team, UnmarshalledTeam } from "./arena-team"

export type TRegistr = 'open' | 'close'
type TArenaStatus = 'pending' | 'start' | 'over'

export type TArenaProps = {
    id: string
    place: ArenaPlace
    registr: TRegistr
    status: TArenaStatus
    teams: Team[]
}

export type UnmarshalledArena = {
    teams: UnmarshalledTeam[]
    place: TLatLng
} & Omit<TArenaProps, 'teams' | 'place'>

export class Arena {

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
        }
    }

    isFullTeams(): boolean {
        return this.teamList.every(team => team.getMembersNumber() === this._teamMembersNumber)
    }

    addPointer(pointer: number): Team {
        const team = this._teamList.find(team => team.getMembersNumber() < this._teamMembersNumber)

        if(team instanceof Team) {
            team.addPointer(pointer)
            return team
        }

        throw new Error('ssdsdsd')

    }

    completeBattle(defeatTeamId: number) {
        this.teamList.forEach(team => {
            if (team.id === defeatTeamId) {
                team.defeatTeam()
            } else {
                team.victoryTeam()
            }
        })
    }

    killPointer(pointerId: number, teamId: number): Team {
        const team = this.teamList.filter(team => {
            if (team.id === teamId) {
                team.members.forEach(member => {
                    if (member === pointerId) {
                        team.killTeamMember()
                    }
                })
                return true
            }
        })

        if(team[0].alive_members === 0) {
            this.completeBattle(teamId)
        }

        try {
            return team[0]
        } catch(e) {
            throw new Error('======')
        }

    }

    delPointer(pointerId: number, teamId: number): Team {
        const team = this.teamList.filter(team => {
            if (team.id === teamId) {
                team.members.forEach(member => {
                    if (member === pointerId) {
                        team.delTeamMember(pointerId)
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


    get pointers(): number[] {
        let pointers: number[] = []
        this.teamList.forEach(team => {
            pointers = [...pointers, ...team.members.map(member => member)]
        })
        return pointers
    }

    get teamList() {
        return this._teamList
    }

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