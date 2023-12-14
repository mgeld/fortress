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
exports.ZoneService = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../types");
const random_number_1 = require("../libs/random-number");
const zone_1 = require("../infra/database/mappers/zone");
let ZoneService = class ZoneService {
    memoryInsert(zone) {
        return this._memoryRepository.insert(zone);
    }
    baseInsert(zone) {
        return this._baseRepository.insert(zone);
    }
    getById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const zone = yield this.memoryGetById(userId);
                return zone;
            }
            catch (e) {
                console.log('WORKIN!!!!!!!');
                const zone = yield this.baseGetById(userId);
                this.memoryInsert(zone);
                return zone;
            }
        });
    }
    memoryGetById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const zone = yield this._memoryRepository.getById(userId);
                return zone;
            }
            catch (e) {
                throw new Error('ZoneService memoryGetById catch throw');
            }
        });
    }
    memoryGetByIds(userIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const zones = yield this._memoryRepository.getByIds(userIds);
            return zones;
        });
    }
    baseGetById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('baseGetById userId', userId);
            const zone = yield this._baseRepository.getById(userId);
            return zone;
        });
    }
    getTrophies() {
        return __awaiter(this, void 0, void 0, function* () {
            const zones = yield this._baseRepository.getTrophies();
            return zones;
        });
    }
    create(color) {
        const DEFAULT_COLOR = (0, random_number_1.randomNumber)(1, 6);
        const DEFAULT_RUBIES = 150;
        const DEFAULT_COINS = 2000;
        const DEFAULT_TROPHIES = 0;
        const DEFAULT_RANK = 1;
        const DEFAULT_EXP = 0;
        const DEFAULT_TEMP_EXP = 0;
        const DEFAULT_LEVEL = 1;
        const DEFAULT_SECTORS = 0;
        const stormtrooper_corps = {
            level: 1,
            invaders: 50,
            power: 5
        };
        const rank = {
            rank: 1,
            exp: 0,
            tempExp: 0
        };
        const terrain = {
            level: 1,
            sectors: 0,
            defenders: 0
        };
        const hold = {
            level: 1,
            items: []
        };
        const zone = zone_1.ZoneMapper.toDomain({
            id: 0,
            color: DEFAULT_COLOR,
            description: '',
            rubies: DEFAULT_RUBIES,
            coins: DEFAULT_COINS,
            trophies: DEFAULT_TROPHIES,
            rank,
            terrain,
            stormtrooper_corps,
            hold
        });
        return zone;
    }
    memoryUpdate(zone) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('ZoneService memoryUpdate');
            yield this._memoryRepository.update(zone);
        });
    }
    memoryUpdates(zones) {
        return __awaiter(this, void 0, void 0, function* () {
            zones.forEach((zone) => __awaiter(this, void 0, void 0, function* () {
                yield this._memoryRepository.update(zone);
            }));
        });
    }
    baseUpdate(zone) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._baseRepository.update(zone);
        });
    }
    remove(userId) {
        this._memoryRepository.delete(userId);
    }
};
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.ZoneMemoryRepository),
    __metadata("design:type", Object)
], ZoneService.prototype, "_memoryRepository", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.ZoneRepository),
    __metadata("design:type", Object)
], ZoneService.prototype, "_baseRepository", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.Base64EntityIdGenerator),
    __metadata("design:type", Object)
], ZoneService.prototype, "_entityId", void 0);
ZoneService = __decorate([
    (0, inversify_1.injectable)()
], ZoneService);
exports.ZoneService = ZoneService;
