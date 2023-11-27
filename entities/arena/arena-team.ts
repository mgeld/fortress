import { TLatLng } from "../../common-types/model"
import { TTeamStatus } from "../../common-types/socket/server-to-client"

export type TTeamProps = {
    id: number
    status?: TTeamStatus
    sectors?: number
    members?: number[]
    alive_members?: number
}

export type UnmarshalledTeam = {
    members: number[]
} & Omit<TTeamProps, 'members'>

class Team {
    private _id: number
    private _status: TTeamStatus
    private _members: number[] // Участники
    private _sectors: number // Кол-во секторов
    private _alive_members: number // Кол-во живых участников

    private constructor(props: TTeamProps) {
        this._id = props.id
        this._status = props?.status || 'default'
        this._members = props?.members || []
        this._sectors = props?.sectors || 0
        this._alive_members = props?.alive_members || 0
    }

    public static create(props: TTeamProps) {
        return new Team(props)
    }

    // Возможно, эту функцию придётся переписать, т.к. команд может быть больше и она не следует принципам SOLID
    getPlace(arenaPlace: TLatLng): TLatLng {
        if (this.id === 1) {
            return [
                arenaPlace[0],
                arenaPlace[1] - 0.004
            ]
        }
        return [
            arenaPlace[0],
            arenaPlace[1] + 0.004
        ]
    }

    unmarshal(): UnmarshalledTeam {
        return {
            id: this._id,
            status: this._status,
            sectors: this._sectors,
            members: this._members,
            alive_members: this._alive_members
        }
    }

    addPointer(member: number) {
        this._members = [...this._members, member]
        this._alive_members = this._alive_members + 1
    }

    // Получить кол-во участников команды
    getMembersNumber() {
        return this._members.length
    }

    // Убить одного участника с команды
    killTeamMember(): number {
        this._alive_members = this.alive_members - 1
        return this._alive_members
    }

    // Удалить одного участника
    delTeamMember(memberId: number): number {
        this._alive_members = this.alive_members - 1
        this._members = this._members.filter(member => memberId !== member)
        return this._alive_members
    }

    loseSector() {
        this._sectors = this._sectors - 1
        return this._sectors
    }

    addSector() {
        this._sectors = this._sectors + 1
        console.log('Team addSector this._sectors', this._sectors)
        return this._sectors
    }

    get id() {
        return this._id
    }

    get members() {
        return this._members
    }

    get sectors() {
        return this._sectors
    }

    get status() {
        return this._status
    }

    get alive_members() {
        return this._alive_members
    }

    getMember(pointerId: number) {
        this._members[pointerId]
    }

    defeatTeam() {
        this._status = 'defeat'
    }

    drawTeam() {
        this._status = 'draw'
    }

    victoryTeam() {
        this._status = 'victory'
    }
}

export {
    Team
}