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
exports.CitadelRepository = void 0;
const inversify_1 = require("inversify");
const object_entries_1 = require("../../../../libs/object-entries");
const types_1 = require("../../../../types");
const citadel_1 = require("../../mappers/citadel");
let CitadelRepository = class CitadelRepository {
    getById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [[result]] = yield this._connection.query(`SELECT * FROM citadels WHERE zone_id = ?;`, [_id]);
            if (!result) {
                throw new Error('----------');
            }
            const { zone_id, sectorId, latlng, level, } = result;
            return citadel_1.CitadelMapper.toDomain({
                id: zone_id,
                sectorId,
                latlng,
                level
            });
        });
    }
    insert(citadel) {
        return __awaiter(this, void 0, void 0, function* () {
            const dtoCitadel = citadel.unmarshal();
            const inserted = yield this._connection.query(`
            INSERT INTO citadels(
                zone_id,
                sectorId,
                latlng,
                level
            )VALUES(
                ?,
                ?,
                ?,
                ?
            );
        `, [
                dtoCitadel.id,
                dtoCitadel.sectorId,
                JSON.stringify(dtoCitadel.latlng),
                dtoCitadel.level
            ]);
            return citadel;
        });
    }
    update(citadel) {
        return __awaiter(this, void 0, void 0, function* () {
            const dtoCitadel = citadel.unmarshal();
            let arr = [];
            const arrQuerySet = (0, object_entries_1.entries)(dtoCitadel).map((item) => {
                if (!item)
                    return '';
                if (item[0] === 'latlng') {
                    arr.push(JSON.stringify(item[1]));
                    return `${item[0]} = '?'`;
                }
                arr.push(item[1]);
                return `${item[0]} = ?`;
            });
            const updated = yield this._connection.execute(`
            UPDATE citadels SET ${arrQuerySet.join(',')} WHERE zone_id = ?
        `, [...arr, citadel.id]);
            return citadel;
        });
    }
    delete(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updated = yield this._connection.execute(`DELETE FROM citadels zone_id = ?`, [userId]);
                return true;
            }
            catch (e) {
                return false;
            }
        });
    }
};
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.connection),
    __metadata("design:type", Object)
], CitadelRepository.prototype, "_connection", void 0);
CitadelRepository = __decorate([
    (0, inversify_1.injectable)()
], CitadelRepository);
exports.CitadelRepository = CitadelRepository;
