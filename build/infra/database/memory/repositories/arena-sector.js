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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.ArenaSectorMemoryRepository = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../../../../types");
const memory_data_1 = require("../memory-data");
const arena_sector_1 = require("../../mappers/arena-sector");
let ArenaSectorMemoryRepository = class ArenaSectorMemoryRepository {
    constructor(_database) {
        this._database = _database;
    }
    insert(sector) {
        return __awaiter(this, void 0, void 0, function* () {
            const dtoSector = sector.unmarshal();
            const inserted = yield this._database.sector.insert(dtoSector);
            return arena_sector_1.ArenaSectorMapper.toDomain(inserted);
        });
    }
    inserts(sectors) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                sectors.forEach((sector) => __awaiter(this, void 0, void 0, function* () {
                    yield this._database.arenaSector.insert(sector);
                }));
                return true;
            }
            catch (e) {
                throw new Error('Ну, что-то пошло не так в inserts memory');
            }
        });
    }
    getById(sectorId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sector = yield this._database.arenaSector.getById(sectorId);
            if (!sector) {
                throw new Error('----------');
            }
            return arena_sector_1.ArenaSectorMapper.toDomain(sector);
        });
    }
    getByIds(sectorIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const sectors = yield this._database.arenaSector.getByIds(sectorIds);
            if (!sectors) {
                throw new Error('----------');
            }
            return sectors.map(sector => arena_sector_1.ArenaSectorMapper.toDomain(sector));
        });
    }
    getByArena(arena) {
        return __awaiter(this, void 0, void 0, function* () {
            const sectors = yield this._database.arenaSector.findAll();
            if (!sectors) {
                throw new Error('----------');
            }
            return sectors.filter(sector => sector.arena === arena);
        });
    }
    update(sector) {
        return __awaiter(this, void 0, void 0, function* () {
            const dtoSector = sector.unmarshal();
            const updated = yield this._database.arenaSector.update(dtoSector.id, dtoSector);
            return arena_sector_1.ArenaSectorMapper.toDomain(updated);
        });
    }
    delete(sectorId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._database.arenaSector.delete(sectorId);
        });
    }
    getByArenasSectors(arenas) {
        return __awaiter(this, void 0, void 0, function* () {
            const sectors = yield this._database.arenaSector.findAll();
            if (!sectors) {
                throw new Error('----------');
            }
            return sectors.filter(sector => ~arenas.findIndex(arena => sector.arena === arena));
        });
    }
    deleteByArenas(arenas) {
        return __awaiter(this, void 0, void 0, function* () {
            const _sectors = yield this.getByArenasSectors(arenas);
            try {
                _sectors.forEach((sector) => __awaiter(this, void 0, void 0, function* () {
                    yield this._database.arenaSector.delete(sector.id);
                }));
                console.log('deleteByArenas true');
                return true;
            }
            catch (e) {
                console.log('deleteByArenas false');
                return false;
            }
        });
    }
};
ArenaSectorMemoryRepository = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.Database)),
    __metadata("design:paramtypes", [memory_data_1.MemoryData])
], ArenaSectorMemoryRepository);
exports.ArenaSectorMemoryRepository = ArenaSectorMemoryRepository;
