"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Member = void 0;
class Member {
    constructor(props) {
        this._userId = props.userId;
        this._killed = props.killed || 0;
        this._damage = props.damage || 0;
        this._pos = props.pos;
        this._arenaId = props.arena || '';
        this._arenaTeamId = props.arenaTeam || 0;
    }
    static create(props) {
        return new Member(props);
    }
    unmarshal() {
        return {
            id: String(this._userId),
            userId: this._userId,
            killed: this.killed,
            damage: this.damage,
            pos: this.pos,
            arena: this.arena,
            arenaTeam: this.arenaTeam,
        };
    }
    pointerUnmarshal() {
        return {
            userId: this._userId,
            pos: this.pos,
        };
    }
    addKilledPointer() {
        this._killed = this._killed + 1;
        return this._killed;
    }
    leaveArena() {
        this._arenaId = '';
        this._arenaTeamId = 0;
    }
    makeDamage(damage) {
        this._damage = this._damage + damage;
    }
    get userId() {
        return this._userId;
    }
    get killed() {
        return this._killed;
    }
    get pos() {
        return this._pos;
    }
    set pos(pos) {
        this._pos = pos;
    }
    get damage() {
        return this._damage;
    }
    get arena() {
        return this._arenaId;
    }
    set arena(arenaId) {
        this._arenaId = arenaId;
    }
    get arenaTeam() {
        return this._arenaTeamId;
    }
    set arenaTeam(teamId) {
        this._arenaTeamId = teamId;
    }
}
exports.Member = Member;
