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
exports.VkUserService = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../types");
const vk_user_1 = require("../infra/database/memory/repositories/vk-user");
const vk_user_2 = require("../infra/database/mysql2/repositories/vk-user");
let VkUserService = class VkUserService {
    memoryInsert(zone) {
        const vk_user = {
            id: zone.zone_id,
            vk_id: zone.user_id,
            is_msg: zone.is_msg,
            losses: 0
        };
        if (zone.ufo)
            vk_user.ufo = zone.ufo;
        this._memoryRepository.insert(vk_user);
        return vk_user;
    }
    memoryUpdate(zone) {
        this._memoryRepository.update(zone);
    }
    getById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const zone = yield this.memoryGetById(userId);
                return zone;
            }
            catch (e) {
                const zone = yield this.baseGetByZoneId(userId);
                return this.memoryInsert(zone);
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
    baseGetById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const zone = yield this._baseRepository.getById(userId);
            return zone;
        });
    }
    getAbduction(zone_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const zone = yield this._baseRepository.getAbduction({
                ufo_id: zone_id,
                page: 1
            });
            return zone;
        });
    }
    baseInsert({ vk_id, zone_id, ufo }) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._baseRepository.insert({
                user_id: vk_id,
                zone_id: zone_id,
                is_msg: 0,
                is_group: 0,
                ufo: ufo || 0
            });
        });
    }
    baseGetByZoneId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const zone = yield this._baseRepository.getByZoneId(userId);
            return zone;
        });
    }
    clear() {
        this._memoryRepository.clear();
    }
};
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.VkUserRepository),
    __metadata("design:type", vk_user_2.VkUserRepository)
], VkUserService.prototype, "_baseRepository", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.VkUserMemoryRepository),
    __metadata("design:type", vk_user_1.VkUserMemoryRepository)
], VkUserService.prototype, "_memoryRepository", void 0);
VkUserService = __decorate([
    (0, inversify_1.injectable)()
], VkUserService);
exports.VkUserService = VkUserService;
