"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bomb = void 0;
class Bomb {
    constructor(props) {
        this.bomb = props.bomb;
        this._id = props.id;
        this._counter = props.counter;
        this._status = (props === null || props === void 0 ? void 0 : props.status) ? 'used' : 'stock';
    }
    static create(props) {
        return new Bomb(props);
    }
    unmarshal() {
        return {
            id: this._id,
            bomb: this.symbolToNumber(this.bomb.symbol),
            level: this.bomb.level,
            counter: this.counter,
            status: this.status === 'used' ? 1 : 0
        };
    }
    symbolToNumber(symbol) {
        const symbols = {
            'aerial': 1
        };
        return symbols[symbol];
    }
    numberToSymbol(number) {
        const numbers = {
            1: 'aerial'
        };
        return numbers[number];
    }
    get id() {
        return this._id;
    }
    set counter(count) {
        this._counter = count;
    }
    get counter() {
        return this._counter;
    }
    set status(status) {
        this._status = status;
    }
    get status() {
        return this._status;
    }
}
exports.Bomb = Bomb;
