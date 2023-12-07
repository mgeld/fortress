"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Team = void 0;
class Team {
    constructor(props) {
        this._id = props.id;
        this._status = (props === null || props === void 0 ? void 0 : props.status) || 'default';
        this._members = (props === null || props === void 0 ? void 0 : props.members) || [];
        this._sectors = (props === null || props === void 0 ? void 0 : props.sectors) || 0;
        this._alive_members = (props === null || props === void 0 ? void 0 : props.alive_members) || 0;
    }
    static create(props) {
        return new Team(props);
    }
    getPlace(arenaPlace) {
        if (this.id === 1) {
            return [
                arenaPlace[0],
                arenaPlace[1] - 0.004
            ];
        }
        return [
            arenaPlace[0],
            arenaPlace[1] + 0.004
        ];
    }
    unmarshal() {
        return {
            id: this._id,
            status: this._status,
            sectors: this._sectors,
            members: this._members,
            alive_members: this._alive_members
        };
    }
    addPointer(member) {
        this._members = [...this._members, member];
        this._alive_members = this._alive_members + 1;
    }
    getMembersNumber() {
        return this._members.length;
    }
    killTeamMember() {
        this._alive_members = this.alive_members - 1;
        return this._alive_members;
    }
    delTeamMember(memberId) {
        this._alive_members = this.alive_members - 1;
        this._members = this._members.filter(member => memberId !== member);
        return this._alive_members;
    }
    loseSector() {
        this._sectors = this._sectors - 1;
        return this._sectors;
    }
    addSector() {
        this._sectors = this._sectors + 1;
        return this._sectors;
    }
    get id() {
        return this._id;
    }
    get members() {
        return this._members;
    }
    get sectors() {
        return this._sectors;
    }
    get status() {
        return this._status;
    }
    get alive_members() {
        return this._alive_members;
    }
    getMember(pointerId) {
        this._members[pointerId];
    }
    defeatTeam() {
        this._status = 'defeat';
    }
    drawTeam() {
        this._status = 'draw';
    }
    victoryTeam() {
        this._status = 'victory';
    }
}
exports.Team = Team;
