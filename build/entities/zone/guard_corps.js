"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuardCorps = void 0;
class GuardCorps {
    constructor(props) {
        this._defenders = props.defenders;
    }
    unmarshal() {
        return {
            defenders: this._defenders
        };
    }
    newDefender() {
        this._defenders = this._defenders + 1;
        return this._defenders;
    }
    killDefender() {
        this._defenders = this._defenders - 1;
        return this._defenders;
    }
    static levels() {
        return {
            1: 50,
            2: 150,
            3: 255,
            4: 365,
        };
    }
    get defenders() {
        return this._defenders;
    }
}
exports.GuardCorps = GuardCorps;
