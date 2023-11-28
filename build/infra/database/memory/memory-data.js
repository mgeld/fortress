"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryData = void 0;
const inversify_1 = require("inversify");
class Collection {
    constructor() {
        this.data = {};
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return Object.values(this.data);
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.data[id];
        });
    }
    getByIds(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            return ids.map(id => this.data[id]);
        });
    }
    insert(value) {
        return __awaiter(this, void 0, void 0, function* () {
            this.data[value.id] = value;
            return value;
        });
    }
    count() {
        return __awaiter(this, void 0, void 0, function* () {
            return Object.values(this.data).length;
        });
    }
    update(id, value) {
        return __awaiter(this, void 0, void 0, function* () {
            this.data[id] = value;
            return this.data[id];
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return delete this.data[id];
        });
    }
}
let MemoryData = class MemoryData {
    constructor() {
        this.pointer = new Collection();
        this.zone = new Collection();
        this.citadel = new Collection();
        this.areal = new Collection();
        this.arena = new Collection();
        this.arenaTeamMember = new Collection();
        this.arenaSector = new Collection();
        this.weapon = new Collection();
        this.bomb = new Collection();
        this.sector = new Collection();
    }
};
MemoryData = __decorate([
    (0, inversify_1.injectable)()
], MemoryData);
exports.MemoryData = MemoryData;
