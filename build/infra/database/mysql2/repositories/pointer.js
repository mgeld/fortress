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
exports.PointerRepository = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../../../../types");
const pointer_1 = require("../../mappers/pointer");
let PointerRepository = class PointerRepository {
    getById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [[result]] = yield this._connection.query(`SELECT * FROM pointers WHERE zone_id = ?;`, [_id]);
            const { zone_id, level, health, icon, name, color, pos_lat, pos_lng, weapons, areal } = result;
            return pointer_1.PointerMapper.toDomain({
                id: zone_id,
                level,
                user: {
                    icon,
                    name
                },
                color,
                health,
                pos: [+pos_lat, +pos_lng],
                weapons,
                bombs: [],
                areal
            });
        });
    }
    getZoneByIds(_ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield this._connection.query(`SELECT
                zone_id,
                -- name,
                color
            FROM
                pointers
            WHERE
                zone_id IN (?);`, [_ids]);
            if (!result) {
                throw new Error('----------');
            }
            return result.map(pointer => ({
                zone_id: pointer.zone_id,
                color: pointer.color
            }));
        });
    }
    getByIds(_ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield this._connection.query(`SELECT * FROM pointers WHERE zone_id IN (?);`, [_ids]);
            if (!result) {
                throw new Error('----------');
            }
            return result.map(pointer => {
                const { zone_id, level, icon, name, color, health, pos_lat, pos_lng, weapons, areal } = pointer;
                return pointer_1.PointerMapper.toDomain({
                    id: zone_id,
                    level,
                    user: {
                        icon,
                        name,
                    },
                    color,
                    health,
                    pos: [pos_lat, pos_lng],
                    weapons,
                    bombs: [],
                    areal: areal
                });
            });
        });
    }
    insert(pointer) {
        return __awaiter(this, void 0, void 0, function* () {
            const dtoPointer = pointer.unmarshal();
            const inserted = yield this._connection.query(`
            INSERT INTO pointers(
                zone_id,
                level,
                icon,
                name,
                color,
                health,
                pos_lat,
                pos_lng,
                weapons,
                areal
            )VALUES(
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?
            );
        `, [
                dtoPointer.id,
                dtoPointer.level,
                dtoPointer.user.icon,
                dtoPointer.user.name,
                dtoPointer.color,
                dtoPointer.health,
                dtoPointer.pos[0],
                dtoPointer.pos[1],
                JSON.stringify(dtoPointer.weapons),
                dtoPointer.areal
            ]);
            return pointer;
        });
    }
    update(pointer) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Pointer Update Mysql2');
            const dtoPointer = pointer.unmarshal();
            console.log('Pointer Update dtoPointer.color', dtoPointer.color);
            const updated = yield this._connection.execute(`
            UPDATE
                pointers
            SET
                level = ?,
                health = ?,
                icon = ?,
                name = ?,
                color = ?,
                pos_lat = ?,
                pos_lng = ?,
                weapons = ?,
                areal = ?
            WHERE zone_id = ?
        `, [
                dtoPointer.level,
                dtoPointer.health,
                dtoPointer.user.icon,
                dtoPointer.user.name,
                dtoPointer.color,
                dtoPointer.pos[0],
                dtoPointer.pos[1],
                JSON.stringify(dtoPointer.weapons),
                dtoPointer.areal,
                pointer.zoneId
            ]);
            return pointer;
        });
    }
};
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.connection),
    __metadata("design:type", Object)
], PointerRepository.prototype, "_connection", void 0);
PointerRepository = __decorate([
    (0, inversify_1.injectable)()
], PointerRepository);
exports.PointerRepository = PointerRepository;
