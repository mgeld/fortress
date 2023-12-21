"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logs = void 0;
const inversify_1 = require("inversify");
class Takes {
    constructor() {
        this.data = {};
    }
    add(value) {
        this.data[value] = value;
        console.log('Logs takes add', value);
        return value;
    }
    clear() {
        this.data = {};
    }
    get() {
        return Object.values(this.data);
    }
}
let Logs = class Logs {
    constructor() {
        this.takes = new Takes();
    }
};
Logs = __decorate([
    (0, inversify_1.injectable)()
], Logs);
exports.Logs = Logs;
