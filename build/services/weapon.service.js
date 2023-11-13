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
exports.WeaponService = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../types");
const gun_1 = require("../entities/weapon/gun");
let WeaponService = class WeaponService {
    createGun() {
        const _weapon = gun_1.Gun.create({
            id: this._entityId.nextIdEntity().id,
            status: 1
        });
        return _weapon;
    }
    memoryGetById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._memoryRepository.getById(id);
        });
    }
    memoryInsert(weapon) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._memoryRepository.insert(weapon);
        });
    }
    baseInsert(weapon) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._baseRepository.insert(weapon);
        });
    }
    baseGetById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._baseRepository.getById(id);
        });
    }
    memoryUpdate(weapon) {
        return __awaiter(this, void 0, void 0, function* () {
            const _weapon = yield this._memoryRepository.update(weapon);
        });
    }
    baseUpdate(weapon) {
        return __awaiter(this, void 0, void 0, function* () {
            const _weapon = yield this._baseRepository.update(weapon);
        });
    }
    remove(id) {
        return this._memoryRepository.delete(id);
    }
};
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.WeaponMemoryRepository),
    __metadata("design:type", Object)
], WeaponService.prototype, "_memoryRepository", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.WeaponRepository),
    __metadata("design:type", Object)
], WeaponService.prototype, "_baseRepository", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.Base64EntityIdGenerator),
    __metadata("design:type", Object)
], WeaponService.prototype, "_entityId", void 0);
WeaponService = __decorate([
    (0, inversify_1.injectable)()
], WeaponService);
exports.WeaponService = WeaponService;
