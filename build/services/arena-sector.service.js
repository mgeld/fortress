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
exports.ArenaSectorService = void 0;
const types_1 = require("../types");
const inversify_1 = require("inversify");
const sector_1 = require("../entities/arena/sector");
let ArenaSectorService = class ArenaSectorService {
    create({ id, latlng, team_id, arena, }) {
        return sector_1.ArenaSector.create({
            id,
            latlng,
            team_id,
            arena
        });
    }
    memoryInsert(sector) {
        return this._memoryRepository.insert(sector);
    }
    getById(sectorId, arenaId) {
        return this._memoryRepository.getById(sectorId, arenaId);
    }
    update(sector) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._memoryRepository.update(sector);
        });
    }
    remove(sectorId) {
        this._memoryRepository.delete(sectorId);
    }
    removeByArenas(arenas) {
        this._memoryRepository.deleteByArenas(arenas);
    }
};
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.ArenaSectorMemoryRepository),
    __metadata("design:type", Object)
], ArenaSectorService.prototype, "_memoryRepository", void 0);
ArenaSectorService = __decorate([
    (0, inversify_1.injectable)()
], ArenaSectorService);
exports.ArenaSectorService = ArenaSectorService;
