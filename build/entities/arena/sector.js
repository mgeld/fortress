"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArenaSector = void 0;
const random_number_1 = require("../../libs/random-number");
class ArenaSector {
    constructor(sector) {
        this._id = sector.id;
        this._number = (sector === null || sector === void 0 ? void 0 : sector.number) || 0;
        this._latlng = sector.latlng;
        this._team_id = sector.team_id;
        this._defenders = sector.defenders || 5;
        this._invaders = sector.invaders || 0;
        this._booty = sector.booty || 0;
        this._arena = sector.arena;
    }
    static create(sector) {
        return new ArenaSector(sector);
    }
    unmarshal() {
        return {
            id: this._id,
            number: this._number,
            latlng: this._latlng,
            team_id: this._team_id,
            defenders: this._defenders,
            invaders: this._invaders,
            booty: this._booty,
            arena: this._arena
        };
    }
    generateBooty() {
        const container = Math.random() < 0.2 ? 3 : Math.random() < 0.6 ? 2 : 1;
        this._booty = container;
        return container;
    }
    takenBooty() {
        this._booty = 0;
    }
    static probabilityGettingExtractionInFort(pos) {
        const probabilityNumber = Math.ceil((+pos[0].toString().slice(-1) + +pos[1].toString().slice(-1)));
        return probabilityNumber <= 6;
    }
    invade(invader_team) {
        if (invader_team === this._team_id &&
            this._invaders === 0) {
            this.addDefender();
            return 'defense';
        }
        else {
            const winner = this.fightWinner();
            if (invader_team === this._team_id && winner === 'defender') {
                this.killInvader();
                this.addDefender();
                return 'victory';
            }
            else if (invader_team === this._team_id && winner === 'invader') {
                return 'defeat';
            }
            else if (invader_team !== this._team_id && winner === 'defender') {
                return 'defeat';
            }
            else if (invader_team !== this._team_id && winner === 'invader') {
                this.killDefender();
                this.addInvader();
                return 'victory';
            }
            return 'defense';
        }
    }
    leaveGuard(user) {
        let isLeave = null;
        if (user === this._team_id) {
            if (this._invaders > 0) {
                this.killInvader();
                isLeave = 'invader';
            }
            else if (this._defenders > 1) {
                this.killDefender();
                isLeave = 'defender';
            }
        }
        return isLeave;
    }
    setOwner(new_owner_id) {
        if (this._defenders === 0) {
            this._team_id = new_owner_id;
            this._defenders = this._invaders;
            this._invaders = 0;
        }
    }
    static getContainerExtr(cont_id) {
        const __containers = {
            1: [10, 20, 30, 40, 50, 110, 111],
            2: [11, 21, 31, 41, 51, 111, 121],
            3: [12, 22, 32, 42, 52],
        };
        const cont = __containers[cont_id];
        return cont[(0, random_number_1.randomNumber)(0, cont.length - 1)];
    }
    addDefender() {
        this._defenders = this._defenders + 1;
        return this._defenders;
    }
    killDefender() {
        this._defenders = this._defenders - 1;
        return this._defenders;
    }
    addInvader() {
        this._invaders = this._invaders + 1;
        return this._invaders;
    }
    killInvader() {
        this._invaders = this._invaders - 1;
        return this._invaders;
    }
    fightWinner() {
        return Math.random() > 0.5 ? 'invader' : 'defender';
    }
    get id() {
        return this._id;
    }
    get invaders() {
        return this._invaders;
    }
    get team_id() {
        return this._team_id;
    }
    get defenders() {
        return this._defenders;
    }
    get latlng() {
        return this._latlng;
    }
    get booty() {
        return this._booty;
    }
}
exports.ArenaSector = ArenaSector;
