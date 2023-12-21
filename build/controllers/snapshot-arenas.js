"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
exports.SnapshotArenas = void 0;
const types_1 = require("../types");
const inversify_1 = require("inversify");
const rooms_1 = require("../api/socket/socket/rooms");
const arena_service_1 = require("../services/arena.service");
const arena_sector_service_1 = require("../services/arena-sector.service");
let SnapshotArenas = class SnapshotArenas {
    getInactiveArenas() {
        return this._rooms.areals.getInactiveRooms();
    }
    clearInactiveArenas() {
        return __awaiter(this, void 0, void 0, function* () {
            const inactiveArenas = this.getInactiveArenas();
            this._rooms.areals.clearRooms(inactiveArenas);
            this._sectorService.removeByArenas(inactiveArenas);
            const arenas = yield this._arenaService.deleteArenas(inactiveArenas);
        });
    }
};
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.Rooms),
    __metadata("design:type", rooms_1.Rooms)
], SnapshotArenas.prototype, "_rooms", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.ArenaService),
    __metadata("design:type", arena_service_1.ArenaService)
], SnapshotArenas.prototype, "_arenaService", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.ArenaSectorService),
    __metadata("design:type", arena_sector_service_1.ArenaSectorService)
], SnapshotArenas.prototype, "_sectorService", void 0);
SnapshotArenas = __decorate([
    (0, inversify_1.injectable)()
], SnapshotArenas);
exports.SnapshotArenas = SnapshotArenas;
