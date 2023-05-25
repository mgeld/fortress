import { Member, TTeamMember } from "./arena-team-member"

type TTeamStatus = 'default' | 'victory' | 'defeat'

export type TTeamProps = {
    id: number
    status?: TTeamStatus
    members?: Member[]
}

export type UnmarshalledTeam = {
    members: TTeamMember[]
} & Omit<TTeamProps, 'members'>

class Team {
    private _id: number
    private _status: TTeamStatus
    private _members: Record<number, Member>
    private _alive_members: number

    private constructor(props: TTeamProps) {
        this._id = props.id
        this._status = props.status || 'default'
        this._members = props.members || []
        this._alive_members = 0
    }

    public static create(props: TTeamProps) {
        return new Team(props)
    }

    unmarshal(): UnmarshalledTeam {
        return {
            id: this._id,
            status: this._status,
            members: Object.values(this._members).map(member => member.unmarshal())
        }
    }

    addPointer(member: Member) {
        this._members[member.pointerId] = member
    }

    getMembersNumber() {
        return Object.values(this._members).length
    }

    get id() {
        return this._id
    }

    get members() {
        return this._members
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