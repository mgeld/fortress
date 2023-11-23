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
    private _teamMembersNumber: number = 1

    private _timer?: ReturnType<typeof setTimeout>

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


    set timer(t: ReturnType<typeof setTimeout>) {
        this._timer = t
    }
    
    destroyTimer() {
        this._timer && clearTimeout(this._timer)
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

    getTeam(id: number): Team {
        return this.teamList.filter(team => team.id === id)[0]
    }

    isFullTeams(): boolean {
        return this.teamList.every(team => team.getMembersNumber() === this._teamMembersNumber)
    }

    public battleStart() {
        this._registr = 'close'
        this._status = 'start'
    }

    public battleOver() {
        this._status = 'over'
    }

    addPointer(pointer: number): Team {
        const team = this._teamList.find(team => team.getMembersNumber() < this._teamMembersNumber)

        if (team instanceof Team) {
            team.addPointer(pointer)
            return team
        }

        throw new Error('ssdsdsd')
    }

    // Завершить битву типа
    completeBattle(defeatTeamId: number) {
        this.teamList.forEach(team => {
            if (team.id === defeatTeamId) {
                team.defeatTeam()
            } else {
                team.victoryTeam()
            }
        })
        this.battleOver()
    }

    addSector(teamId: number) {
        const team = this.teamList.filter(team => {
            if (team.id === teamId) {
                team.addSector()
                return true
            }
        })

        // Если секторов больше 5
        // То указываем что другая команда проиграла
        // if (team[0].sectors >= 5) {
        //     this.completeBattle(team[0].id === 1 ? 2 : 1)
        // }

        try {
            return team[0]
        } catch (e) {
            throw new Error('======')
        }
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

        // if (team[0].alive_members === 0) {
        //     this.completeBattle(teamId)
        // }

        try {
            return team[0]
        } catch (e) {
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
        } catch (e) {
            throw new Error('======')
        }
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