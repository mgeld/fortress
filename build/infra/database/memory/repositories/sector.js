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
exports.SectorMemoryRepository = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../../../../types");
const sector_1 = require("../../mappers/sector");
const memory_data_1 = require("../memory-data");
let SectorMemoryRepository = class SectorMemoryRepository {
    insert(sector) {
        return __awaiter(this, void 0, void 0, function* () {
            const dtoSector = sector.unmarshal();
            const inserted = yield this._database.sector.insert(dtoSector);
            return sector_1.SectorMapper.toDomain(inserted);
        });
    }
    inserts(sectors) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                sectors.forEach((sector) => __awaiter(this, void 0, void 0, function* () {
                    yield this._database.sector.insert(sector);
                }));
                return true;
            }
            catch (e) {
                throw new Error('Ну, что-то пошло не так в inserts memory');
            }
        });
    }
    getBoundsSectors(bounds) {
        return __awaiter(this, void 0, void 0, function* () {
            const sectors = yield this._database.sector.findAll();
            if (sectors.length < 1) {
                throw new Error('1 error sectors');
            }
            return sectors.filter(sector => {
                return (sector.zone_id > 0) && sector.latlng[0] > bounds[0][0] && sector.latlng[0] < bounds[1][0] &&
                    sector.latlng[1] > bounds[0][1] && sector.latlng[1] < bounds[1][1];
            });
        });
    }
    getById(sectorId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sector = yield this._database.sector.getById(sectorId);
            if (!sector) {
                throw new Error('----------');
            }
            return sector_1.SectorMapper.toDomain(sector);
        });
    }
    getByIds(sectorIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const sectors = yield this._database.sector.getByIds(sectorIds);
            if (!sectors) {
                throw new Error('----------');
            }
            return sectors.map(sector => sector_1.SectorMapper.toDomain(sector));
        });
    }
    getByAreal(areal) {
        return __awaiter(this, void 0, void 0, function* () {
            const sectorsAll = yield this._database.sector.findAll();
            if (!sectorsAll || sectorsAll.length === 0) {
                throw new Error('----------');
            }
            const sectors = sectorsAll.filter(sector => sector.areal === areal && sector.zone_id > 0);
            if (!sectors || sectors.length === 0) {
                throw new Error('----------');
            }
            return sectors;
        });
    }
    getByArealsSectors(areals) {
        return __awaiter(this, void 0, void 0, function* () {
            const sectors = yield this._database.sector.findAll();
            if (!sectors) {
                throw new Error('----------');
            }
            return sectors.filter(sector => areals.includes(sector.areal));
        });
    }
    getByArealsSectorsAndDiff(areals) {
        return __awaiter(this, void 0, void 0, function* () {
            const sectors = yield this._database.sector.findAll();
            if (!sectors) {
                throw new Error('----------');
            }
            const isArealsInMemory = {};
            const _sectors = sectors.filter(sector => {
                if (areals.includes(sector.areal)) {
                    if (!isArealsInMemory[sector.areal])
                        isArealsInMemory[sector.areal] = sector.areal;
                    return true;
                }
                return false;
            });
            const isArealsInMemoryArr = Object.values(isArealsInMemory);
            const arealsDiff = _sectors.length > 0 ? areals.filter(item => {
                return !isArealsInMemoryArr.includes(item);
            }) : areals;
            return {
                sectors: _sectors,
                diff: arealsDiff
            };
        });
    }
    update(sector) {
        return __awaiter(this, void 0, void 0, function* () {
            const dtoSector = sector.unmarshal();
            const updated = yield this._database.sector.update(dtoSector.id, dtoSector);
            return sector_1.SectorMapper.toDomain(updated);
        });
    }
    delete(sectorId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._database.sector.delete(sectorId);
        });
    }
    deleteByAreals(areals) {
        return __awaiter(this, void 0, void 0, function* () {
            const _sectors = yield this.getByArealsSectors(areals);
            try {
                _sectors.forEach((sector) => __awaiter(this, void 0, void 0, function* () {
                    yield this._database.sector.delete(sector.id);
                }));
                return true;
            }
            catch (e) {
                return false;
            }
        });
    }
};
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.Database),
    __metadata("design:type", memory_data_1.MemoryData)
], SectorMemoryRepository.prototype, "_database", void 0);
SectorMemoryRepository = __decorate([
    (0, inversify_1.injectable)()
], SectorMemoryRepository);
exports.SectorMemoryRepository = SectorMemoryRepository;
