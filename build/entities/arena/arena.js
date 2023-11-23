"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Arena = void 0;
const arena_team_1 = require("./arena-team");
class Arena {
    constructor(arena) {
        this._teamList = [];
        this._teamsNumber = 2;
        this._teamMembersNumber = 1;
        this._id = arena.id;
        this._place = arena.place;
        this._registr = arena.registr;
        this._status = arena.status;
        this._teamList = arena.teams;
    }
    static create(arena) {
        const instance = new Arena(arena);
        return instance;
    }
    set timer(t) {
        this._timer = t;
    }
    destroyTimer() {
        this._timer && clearTimeout(this._timer);
    }
    unmarshal() {
        return {
            id: this._id,
            place: this._place.place,
            registr: this.registr,
            status: this._status,
            teams: this._teamList.map(team => team.unmarshal())
        };
    }
    getTeam(id) {
        return this.teamList.filter(team => team.id === id)[0];
    }
    isFullTeams() {
        return this.teamList.every(team => team.getMembersNumber() === this._teamMembersNumber);
    }
    battleStart() {
        this._registr = 'close';
        this._status = 'start';
    }
    battleOver() {
        this._status = 'over';
    }
    addPointer(pointer) {
        const team = this._teamList.find(team => team.getMembersNumber() < this._teamMembersNumber);
        if (team instanceof arena_team_1.Team) {
            team.addPointer(pointer);
            return team;
        }
        throw new Error('ssdsdsd');
    }
    completeBattle(defeatTeamId) {
        this.teamList.forEach(team => {
            if (team.id === defeatTeamId) {
                team.defeatTeam();
            }
            else {
                team.victoryTeam();
            }
        });
        this.battleOver();
    }
    addSector(teamId) {
        const team = this.teamList.filter(team => {
            if (team.id === teamId) {
                team.addSector();
                return true;
            }
        });
        try {
            return team[0];
        }
        catch (e) {
            throw new Error('======');
        }
    }
    killPointer(pointerId, teamId) {
        const team = this.teamList.filter(team => {
            if (team.id === teamId) {
                team.members.forEach(member => {
                    if (member === pointerId) {
                        team.killTeamMember();
                    }
                });
                return true;
            }
        });
        try {
            return team[0];
        }
        catch (e) {
            throw new Error('======');
        }
    }
    delPointer(pointerId, teamId) {
        const team = this.teamList.filter(team => {
            if (team.id === teamId) {
                team.members.forEach(member => {
                    if (member === pointerId) {
                        team.delTeamMember(pointerId);
                    }
                });
                return true;
            }
        });
        try {
            return team[0];
        }
        catch (e) {
            throw new Error('======');
        }
    }
    get pointers() {
        let pointers = [];
        this.teamList.forEach(team => {
            pointers = [...pointers, ...team.members.map(member => member)];
        });
        return pointers;
    }
    get teamList() {
        return this._teamList;
    }
    get id() {
        return this._id;
    }
    get place() {
        return this._place;
    }
    get registr() {
        return this._registr;
    }
    get status() {
        return this._status;
    }
}
exports.Arena = Arena;
