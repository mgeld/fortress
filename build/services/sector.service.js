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
exports.SectorService = void 0;
const types_1 = require("../types");
const inversify_1 = require("inversify");
const areal_1 = require("../entities/pointer/areal");
const sector_1 = require("../entities/sector/sector");
let SectorService = class SectorService {
    create({ id, latlng, zone_id, }) {
        return sector_1.Sector.create({
            id,
            latlng,
            zone_id,
            areal: areal_1.Areal.generator(latlng)
        });
    }
    getArealSectors(areal) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this._memoryRepository.getByAreal(areal);
            }
            catch (e) {
                return this.getBaseArealsSectors([areal]);
            }
        });
    }
    getArealsSectors(areals) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { sectors, diff } = yield this._memoryRepository.getByArealsSectorsAndDiff(areals);
                if (diff.length > 0) {
                    const diffSects = yield this.getBaseArealsSectors(diff);
                    return [...diffSects, ...sectors.filter(item => item.zone_id > 0)];
                }
                return sectors.filter(item => item.zone_id > 0);
            }
            catch (e) {
                return this.getBaseArealsSectors(areals);
            }
        });
    }
    getBaseArealsSectors(areals) {
        return __awaiter(this, void 0, void 0, function* () {
            const sectors = yield this._baseRepository.getByAreals(areals);
            yield this._memoryRepository.inserts(sectors);
            return sectors.filter(sector => sector.zone_id > 0);
        });
    }
    getZonesAroundAreal(areal) {
        return __awaiter(this, void 0, void 0, function* () {
            const _sectors = yield this.getArealSectors(areal);
            return this.unmarshalSectors(_sectors);
        });
    }
    getZonesAroundAreals(areals) {
        return __awaiter(this, void 0, void 0, function* () {
            const _sectors = yield this.getArealsSectors(areals);
            return this.unmarshalSectors(_sectors);
        });
    }
    getBoundsFort(position) {
        return __awaiter(this, void 0, void 0, function* () {
            const bounds = areal_1.Areal.getBoundsSatellite(position);
            const sectors = yield this._baseRepository.getBoundsSectors(bounds);
            return sectors;
        });
    }
    unmarshalSectors(_sectors) {
        const sectors = _sectors.reduce((zoneItems, item) => {
            if (!zoneItems[item.zone_id]) {
                zoneItems[item.zone_id] = {};
                zoneItems[item.zone_id]['zone'] = {
                    zone_id: item.zone_id,
                    color: 1
                };
                zoneItems[item.zone_id]['sectors'] = {};
            }
            if (!zoneItems[item.zone_id]['sectors'][item.areal])
                zoneItems[item.zone_id]['sectors'][item.areal] = [];
            zoneItems[item.zone_id]['sectors'][item.areal].push(item.id);
            return zoneItems;
        }, {});
        return sectors;
    }
    memoryInsert(sector) {
        return this._memoryRepository.insert(sector);
    }
    baseInsert(sector) {
        return this._baseRepository.insert(sector);
    }
    baseInserts(sectors) {
        return this._baseRepository.inserts(sectors);
    }
    getById(sectorId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this._memoryRepository.getById(sectorId);
            }
            catch (e) {
                return this._baseRepository.getById(sectorId);
            }
        });
    }
    getByIds(sectorIds) {
        return this._memoryRepository.getByIds(sectorIds);
    }
    update(sector) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._memoryRepository.update(sector);
        });
    }
    remove(sectorId) {
        this._memoryRepository.delete(sectorId);
    }
    removeByAreals(areals) {
        this._memoryRepository.deleteByAreals(areals);
    }
};
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.SectorRepository),
    __metadata("design:type", Object)
], SectorService.prototype, "_baseRepository", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.SectorMemoryRepository),
    __metadata("design:type", Object)
], SectorService.prototype, "_memoryRepository", void 0);
SectorService = __decorate([
    (0, inversify_1.injectable)()
], SectorService);
exports.SectorService = SectorService;
