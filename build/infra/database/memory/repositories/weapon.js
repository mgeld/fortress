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
exports.WeaponMemoryRepository = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../../../../types");
const weapon_1 = require("../../mappers/weapon");
const memory_data_1 = require("../memory-data");
let WeaponMemoryRepository = class WeaponMemoryRepository {
    getWeapons(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const weapons = yield this._database.weapon.getByIds(ids);
            if (!weapons) {
                throw new Error('----------');
            }
            return weapons.map(weapon => weapon_1.WeaponMapper.toDomain(weapon));
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const weapon = yield this._database.weapon.getById(id);
            if (!weapon) {
                throw new Error('WeaponMemoryRepository getById Error');
            }
            return weapon_1.WeaponMapper.toDomain(weapon);
        });
    }
    insert(weapon) {
        return __awaiter(this, void 0, void 0, function* () {
            const dtoWeapon = weapon.unmarshal();
            const inserted = yield this._database.weapon.insert(dtoWeapon);
            return weapon_1.WeaponMapper.toDomain(inserted);
        });
    }
    update(weapon) {
        return __awaiter(this, void 0, void 0, function* () {
            const dtoWeapon = weapon.unmarshal();
            const updated = yield this._database.weapon.update(dtoWeapon.id, dtoWeapon);
            return weapon_1.WeaponMapper.toDomain(updated);
        });
    }
    delete(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._database.weapon.delete(userId);
        });
    }
};
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.Database),
    __metadata("design:type", memory_data_1.MemoryData)
], WeaponMemoryRepository.prototype, "_database", void 0);
WeaponMemoryRepository = __decorate([
    (0, inversify_1.injectable)()
], WeaponMemoryRepository);
exports.WeaponMemoryRepository = WeaponMemoryRepository;
