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
exports.SectorRepository = void 0;
const inversify_1 = require("inversify");
const object_entries_1 = require("../../../../libs/object-entries");
const types_1 = require("../../../../types");
const sector_1 = require("../../mappers/sector");
let SectorRepository = class SectorRepository {
    insert(sector) {
        return __awaiter(this, void 0, void 0, function* () {
            const dtoSector = sector.unmarshal();
            const inserted = yield this._connection.query(`
        INSERT INTO pointers(
            id,
            invaders,
            defenders,
            lat,
            lng,
            zone_id,
            areal
        )VALUES(
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            0
        );
    `, [
                dtoSector.id,
                dtoSector.invaders,
                dtoSector.defenders,
                dtoSector.latlng[0],
                dtoSector.latlng[1],
                dtoSector.zone_id,
            ]);
            return sector;
        });
    }
    inserts(sectors) {
        return __awaiter(this, void 0, void 0, function* () {
            if (sectors.length === 0) {
                return false;
            }
            const sqlSectors = sectors.map(sector => {
                const dtoSector = sector.unmarshal();
                return [
                    dtoSector.id,
                    dtoSector.invaders,
                    dtoSector.defenders,
                    dtoSector.latlng[0],
                    dtoSector.latlng[1],
                    dtoSector.zone_id,
                    dtoSector.areal
                ];
            });
            console.log('sqlSectors', sqlSectors);
            try {
                const inserted = yield this._connection.query(`
                INSERT INTO sectors(
                    id,
                    invaders,
                    defenders,
                    lat,
                    lng,
                    zone_id,
                    areal
                )VALUES ?
                ON DUPLICATE KEY UPDATE
                    invaders=VALUES(invaders),
                    defenders=VALUES(defenders),
                    zone_id=VALUES(zone_id);
            `, [sqlSectors]);
                return true;
            }
            catch (e) {
                throw new Error('Много записей добавить не удалось. Сорян');
            }
        });
    }
    getBoundsSectors(bounds) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('/// Base getBoundsSectors');
            const where = `lat > ? and lat < ? and lng > ? and lng < ?`;
            try {
                const [result] = yield this._connection.query(`SELECT
                    id,
                    number,
                    CONCAT("[",lat,",",lng,"]") as latlng,
                    zone_id,
                    invaders,
                    defenders,
                    areal
                FROM sectors WHERE ${where};`, [
                    bounds[0][0],
                    bounds[1][0],
                    bounds[0][1],
                    bounds[1][1]
                ]);
                const sects = result.map(sector => (Object.assign(Object.assign({}, sector), { latlng: JSON.parse(sector.latlng) })));
                return sects;
            }
            catch (e) {
                console.log('eeeeeee', e);
                throw new Error('Не удалось вывести территории из базы');
            }
        });
    }
    getByAreal(areal) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('///>>>>>> Base getByAreal');
            try {
                const [result] = yield this._connection.query(`SELECT
                    id,
                    number,
                    CONCAT("[",lat,",",lng,"]") as latlng,
                    zone_id,
                    invaders,
                    defenders,
                    areal
                FROM sectors WHERE areal = ?;`, [areal]);
                const sects = result.map(sector => (Object.assign(Object.assign({}, sector), { latlng: JSON.parse(sector.latlng) })));
                console.log('result sects', sects);
                return sects;
            }
            catch (e) {
                throw new Error('Не удалось вывести территории из базы');
            }
        });
    }
    getById(sectorId) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield this._connection.query(`SELECT
                id,
                number,
                CONCAT("[",lat,",",lng,"]") as latlng,
                zone_id,
                invaders,
                defenders,
                areal
            FROM sectors WHERE id = ?;`, [sectorId]);
            if (!result) {
                throw new Error('----------');
            }
            return sector_1.SectorMapper.toDomain(result);
        });
    }
    getByIds(sectorIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield this._connection.query(`SELECT
                id,
                number,
                CONCAT("[",lat,",",lng,"]") as latlng,
                zone_id,
                invaders,
                defenders,
                areal
            FROM
                sectors
            WHERE id IN(?);`, [[sectorIds]]);
            if (!result) {
                throw new Error('----------');
            }
            return result.map(sector => sector_1.SectorMapper.toDomain(sector));
        });
    }
    update(sector) {
        return __awaiter(this, void 0, void 0, function* () {
            const dtoSector = sector.unmarshal();
            let arr = [];
            const arrQuerySet = (0, object_entries_1.entries)(dtoSector).map((item) => {
                if (!item)
                    return '';
                if (item[0] === 'number')
                    return '';
                if (item[0] === 'latlng') {
                    arr.push(item[1][0]);
                    arr.push(item[1][1]);
                    return [
                        `'lat' = ?`,
                        `'lng' = ?`
                    ];
                }
                arr.push(item[1]);
                return `${item[0]} = ?`;
            });
            const updated = yield this._connection.execute(`
            UPDATE sectors SET ${arrQuerySet.join(',')} WHERE id = ?
        `, [...arr, dtoSector.id]);
            return sector;
        });
    }
    delete(sectorId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updated = yield this._connection.execute(`DELETE FROM sectors id = ?`, [sectorId]);
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
], SectorRepository.prototype, "_connection", void 0);
SectorRepository = __decorate([
    (0, inversify_1.injectable)()
], SectorRepository);
exports.SectorRepository = SectorRepository;
