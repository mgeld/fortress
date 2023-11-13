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
exports.SnapshotSectors = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../types");
const takes_1 = require("../infra/logs/takes");
const rooms_1 = require("../api/socket/socket/rooms");
const sector_service_1 = require("../services/sector.service");
let SnapshotSectors = class SnapshotSectors {
    constructor() { }
    getInactiveAreals() {
        return this._rooms.areals.getInactiveRooms();
    }
    clearInactiveAreals() {
        const areals = this.getInactiveAreals();
        this._rooms.areals.clearRooms(areals);
        this._sectorService.removeByAreals(areals);
    }
    saveSectorsToBase() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('saveSectorsToBase');
            const takes = this.getLogsTakes();
            this.clearLogsTakes();
            const sectors = yield this._sectorService.getByIds(takes);
            yield this._sectorService.baseInserts(sectors);
        });
    }
    getLogsTakes() {
        return this._logs.takes.get();
    }
    clearLogsTakes() {
        return this._logs.takes.clear();
    }
};
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.Logs),
    __metadata("design:type", takes_1.Logs)
], SnapshotSectors.prototype, "_logs", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.Rooms),
    __metadata("design:type", rooms_1.Rooms)
], SnapshotSectors.prototype, "_rooms", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.SectorService),
    __metadata("design:type", sector_service_1.SectorService)
], SnapshotSectors.prototype, "_sectorService", void 0);
SnapshotSectors = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], SnapshotSectors);
exports.SnapshotSectors = SnapshotSectors;
