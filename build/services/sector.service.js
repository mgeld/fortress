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
const inversify_1 = require("inversify");
const areal_1 = require("../entities/pointer/areal");
const sector_1 = require("../entities/sector/sector");
const types_1 = require("../types");
let SectorService = class SectorService {
    create({ id, latlng, zone_id, }) {
        return sector_1.Sector.create({
            id,
            latlng,
            zone_id,
            areal: areal_1.Areal.generator(latlng)
        });
    }
    getBoundsSectors(position) {
        return __awaiter(this, void 0, void 0, function* () {
            const bounds = areal_1.Areal.getBounds(position);
            try {
                console.log('getBoundsSectors try');
                return yield this._memoryRepository.getBoundsSectors(bounds);
            }
            catch (e) {
                const sectors = yield this._baseRepository.getBoundsSectors(bounds);
                console.log('getBoundsSectors catch');
                yield this._memoryRepository.inserts(sectors);
                return sectors;
            }
        });
    }
    getArealSectors(areal) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this._memoryRepository.getByAreal(areal);
            }
            catch (e) {
                const sectors = yield this._baseRepository.getByAreal(areal);
                console.log('getBoundsSectors catch');
                yield this._memoryRepository.inserts(sectors);
                return sectors.filter(sector => sector.zone_id > 0);
            }
        });
    }
    getZonesAroundPosition(position) {
        return __awaiter(this, void 0, void 0, function* () {
            const _sectors = yield this.getBoundsSectors(position);
            return this.unmarshalSectors(_sectors);
        });
    }
    getZonesAroundAreal(areal) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('getZonesAroundAreal areal', areal);
            const _sectors = yield this.getArealSectors(areal);
            return this.unmarshalSectors(_sectors);
        });
    }
    unmarshalSectors(_sectors) {
        const sectors = _sectors.reduce((zoneItems, item) => {
            if (!zoneItems[item.zone_id]) {
                zoneItems[item.zone_id] = {};
                zoneItems[item.zone_id]['zone'] = {
                    zone_id: item.zone_id,
                    name: '',
                    color: 1
                };
                zoneItems[item.zone_id]['sectors'] = [];
            }
            zoneItems[item.zone_id]['sectors'].push(item.id);
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
        return this._memoryRepository.getById(sectorId);
    }
    getByIds(sectorIds) {
        console.log('getByIds sectorIds', sectorIds);
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
