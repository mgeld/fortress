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
exports.ZoneMemoryRepository = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../../../../types");
const memory_data_1 = require("../memory-data");
const zone_1 = require("../../mappers/zone");
let ZoneMemoryRepository = class ZoneMemoryRepository {
    getById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const zone = yield this._database.zone.getById(userId);
            if (!zone) {
                throw new Error('ERROOR ZoneMemoryRepository----------');
            }
            return zone_1.ZoneMapper.toDomain(zone);
        });
    }
    getByIds(userIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const zones = yield this._database.zone.getByIds(userIds);
            if (!zones) {
                throw new Error('----------');
            }
            return zones.map(zone => zone_1.ZoneMapper.toDomain(zone));
        });
    }
    insert(zone) {
        return __awaiter(this, void 0, void 0, function* () {
            const dtoZone = zone.unmarshal();
            const inserted = yield this._database.zone.insert(dtoZone);
            return zone_1.ZoneMapper.toDomain(inserted);
        });
    }
    update(zone) {
        return __awaiter(this, void 0, void 0, function* () {
            const dtoZone = zone.unmarshal();
            const updated = yield this._database.zone.update(dtoZone.id, dtoZone);
            return zone_1.ZoneMapper.toDomain(updated);
        });
    }
    delete(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._database.zone.delete(userId);
        });
    }
};
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.Database),
    __metadata("design:type", memory_data_1.MemoryData)
], ZoneMemoryRepository.prototype, "_database", void 0);
ZoneMemoryRepository = __decorate([
    (0, inversify_1.injectable)()
], ZoneMemoryRepository);
exports.ZoneMemoryRepository = ZoneMemoryRepository;
