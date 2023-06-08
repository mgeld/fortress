// import { Member, TTeamMember } from "./arena-team-member"

import { TLatLng } from "../../common-types/model"

type TTeamStatus = 'default' | 'victory' | 'defeat'

export type TTeamProps = {
    id: number
    status?: TTeamStatus
    alive_members?: number
    // members?: Member[]
    members?: number[]
}

export type UnmarshalledTeam = {
    members: number[]
    // members: TTeamMember[]
} & Omit<TTeamProps, 'members'>

class Team {
    private _id: number
    private _status: TTeamStatus
    // private _members: Record<number, Member>
    private _members: number[]
    private _alive_members: number

    private constructor(props: TTeamProps) {
        this._id = props.id
        this._status = props?.status || 'default'
        this._members = props?.members || []
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
            members: this._members,
            alive_members: this._alive_members
            // members: Object.values(this._members).map(member => member.unmarshal())
        }
    }

    addPointer(member: number) {
        // this._members[member.pointerId] = member
        this._members = [...this._members, member]
        this._alive_members = this._alive_members + 1
    }

    getMembersNumber() {
        return this._members.length
        // return Object.values(this._members).length
    }

    get id() {
        return this._id
    }

    get members() {
        return this._members
    }

    get status() {
        return this._status
    }

    killTeamMember() {
        this._alive_members = this.alive_members - 1
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

    victoryTeam() {
        this._status = 'victory'
    }
}

export {
    Team
}