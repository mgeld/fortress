"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sector = void 0;
const random_number_1 = require("../../libs/random-number");
class Sector {
    constructor(sector) {
        this._id = sector.id;
        this._number = (sector === null || sector === void 0 ? void 0 : sector.number) || 0;
        this._latlng = sector.latlng;
        this._zone_id = sector.zone_id;
        this._defenders = sector.defenders || 5;
        this._invaders = sector.invaders || 0;
        this._booty = sector.booty || 0;
        this._areal = sector.areal;
    }
    static create(sector) {
        return new Sector(sector);
    }
    unmarshal() {
        return {
            id: this._id,
            number: this._number,
            latlng: this._latlng,
            zone_id: this._zone_id,
            defenders: this._defenders,
            invaders: this._invaders,
            booty: this._booty,
            areal: this._areal
        };
    }
    generateBooty() {
        const rand = Math.random();
        const container = rand > 0.5 ? 1 : rand < 0.6 && rand > 0.2 ? 2 : 3;
        this._booty = container;
        return container;
    }
    takenBooty() {
        this._booty = 0;
    }
    static probabilityGettingExtractionInFort(pos) {
        const probabilityNumber = Math.ceil((+pos[0].toString().slice(-1) + +pos[1].toString().slice(-1)));
        console.log('pos', pos);
        console.log('probabilityNumber', probabilityNumber);
        return probabilityNumber === 10;
    }
    invade(invader_user, invader_power, defender_power) {
        if (invader_user === this._zone_id &&
            this._invaders === 0) {
            this.addDefender();
            return 'defense';
        }
        else {
            const winner = this.fightWinner(invader_power, defender_power);
            console.log('winner', winner);
            if (invader_user === this._zone_id && winner === 'defender') {
                this.killInvader();
                this.addDefender();
                return 'victory';
            }
            else if (invader_user === this._zone_id && winner === 'invader') {
                return 'defeat';
            }
            else if (invader_user !== this._zone_id && winner === 'defender') {
                return 'defeat';
            }
            else if (invader_user !== this._zone_id && winner === 'invader') {
                this.killDefender();
                this.addInvader();
                return 'victory';
            }
            return 'defense';
        }
    }
    leaveGuard(user) {
        let isLeave = null;
        if (user === this._zone_id) {
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
            this._zone_id = new_owner_id;
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
    fightWinner(invader_power, defender_power) {
        const chance = (0, random_number_1.randomNumber)(0, invader_power + defender_power);
        return chance < invader_power ? 'invader' : 'defender';
    }
    get id() {
        return this._id;
    }
    get invaders() {
        return this._invaders;
    }
    get zone_id() {
        return this._zone_id;
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
exports.Sector = Sector;
