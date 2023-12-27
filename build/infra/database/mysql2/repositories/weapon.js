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
exports.WeaponRepository = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../../../../types");
const weapon_1 = require("../../mappers/weapon");
const object_entries_1 = require("../../../../libs/object-entries");
let WeaponRepository = class WeaponRepository {
    getWeapons(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield this._connection.query(`SELECT
                id,
                weapon,
                level,
                power,
                distance,
                bullets,
                status
            FROM
                weapons
            WHERE
                id IN (?);`, [ids]);
            if (!result) {
                throw new Error('----------');
            }
            return result.map(weapon => weapon_1.WeaponMapper.toDomain(weapon));
        });
    }
    getById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [[result]] = yield this._connection.query(`SELECT
                id,
                weapon,
                level,
                power,
                distance,
                bullets,
                status
            FROM
                weapons
            WHERE
                id = ?;`, [_id]);
            if (!result) {
                throw new Error('GET WEAPON ERROR----------');
            }
            return weapon_1.WeaponMapper.toDomain(result);
        });
    }
    insert(weapon) {
        return __awaiter(this, void 0, void 0, function* () {
            const dtoWeapon = weapon.unmarshal();
            const inserted = yield this._connection.execute(`
            INSERT INTO weapons(
                id,
                weapon,
                level,
                power,
                distance,
                bullets,
                status
            )VALUES(
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?
            );
        `, [
                dtoWeapon.id,
                dtoWeapon.weapon,
                dtoWeapon.level,
                dtoWeapon.power,
                dtoWeapon.distance,
                dtoWeapon.bullets,
                dtoWeapon.status,
            ]);
            return weapon;
        });
    }
    update(weapon) {
        return __awaiter(this, void 0, void 0, function* () {
            const dtoWeapon = weapon.unmarshal();
            let arr = [];
            const arrQuerySet = (0, object_entries_1.entries)(dtoWeapon).map((item) => {
                arr.push(item[1]);
                return `${item[0]} = ?`;
            });
            const updated = yield this._connection.execute(`
            UPDATE weapons SET ${arrQuerySet.join(',')} WHERE id = ?
        `, [...arr, weapon.id]);
            return weapon;
        });
    }
};
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.connection),
    __metadata("design:type", Object)
], WeaponRepository.prototype, "_connection", void 0);
WeaponRepository = __decorate([
    (0, inversify_1.injectable)()
], WeaponRepository);
exports.WeaponRepository = WeaponRepository;
