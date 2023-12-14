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
exports.ZoneRepository = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../../../../types");
const zone_1 = require("../../mappers/zone");
let ZoneRepository = class ZoneRepository {
    getById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('***ZoneRepository getById _id', _id);
            const [[result]] = yield this._connection.query(`
                SELECT
                    zones.id,

                    zones.color,
                    zones.description,

                    zones.trophies,
                    zones.coins,
                    zones.rubies,

                    hold.level as hold_level,
                    hold.items as hold_items,

                    terrain.level as zone_level,
                    terrain.sectors as zone_sectors,
                    terrain.defenders as zone_defenders,

                    storm.level as storm_level,
                    storm.power,
                    storm.invaders,

                    rc.level as rank_level,
                    rc.exp as rank_exp
                FROM
                    zones
                LEFT JOIN hold ON hold.zone_id = zones.id
                LEFT JOIN terrain ON terrain.zone_id = zones.id
                LEFT JOIN stormtrooper_corps AS storm ON storm.zone_id = zones.id
                LEFT JOIN rank_conquests as rc ON rc.zone_id = zones.id
                WHERE
                    zones.id = ?;
            `, [_id]);
            if (!result) {
                throw new Error('----------');
            }
            const { id, color, description, trophies, coins, rubies, hold_level, hold_items, zone_level, zone_sectors, zone_defenders, storm_level, power, invaders, rank_level, rank_exp } = result;
            return zone_1.ZoneMapper.toDomain({
                id,
                color,
                description,
                trophies,
                coins,
                rubies,
                rank: {
                    rank: rank_level,
                    exp: rank_exp,
                    tempExp: 0
                },
                terrain: {
                    level: zone_level,
                    sectors: zone_sectors,
                    defenders: zone_defenders
                },
                stormtrooper_corps: {
                    level: storm_level,
                    power,
                    invaders
                },
                hold: {
                    level: hold_level,
                    items: hold_items
                }
            });
        });
    }
    insert(zone) {
        return __awaiter(this, void 0, void 0, function* () {
            const dtoZone = zone.unmarshal();
            const addZone = yield this._connection.query(`
            INSERT INTO zones(
                color,
                description,
                trophies,
                coins,
                rubies
            )VALUES(
                ?,
                ?,
                ?,
                ?,
                ?
            );
        `, [
                dtoZone.color,
                dtoZone.description,
                dtoZone.trophies,
                dtoZone.coins,
                dtoZone.rubies
            ]);
            const zoneId = addZone[0].insertId;
            const inserted = yield this._connection.query(`
            INSERT INTO hold(zone_id,level,items)VALUES(?,?,?);
            INSERT INTO terrain(zone_id,level,sectors,defenders)VALUES(?,?,?,?);
            INSERT INTO stormtrooper_corps(zone_id,level,invaders,power)VALUES(?,?,?,?);
            INSERT INTO rank_conquests(zone_id,level,exp)VALUES(?,?,?);
        `, [
                zoneId,
                dtoZone.hold.level,
                JSON.stringify(dtoZone.hold.items),
                zoneId,
                dtoZone.terrain.level,
                dtoZone.terrain.sectors,
                dtoZone.terrain.defenders,
                zoneId,
                dtoZone.stormtrooper_corps.level,
                dtoZone.stormtrooper_corps.invaders,
                dtoZone.stormtrooper_corps.power,
                zoneId,
                dtoZone.rank.rank,
                dtoZone.rank.exp
            ]);
            zone.id = zoneId;
            return zone;
        });
    }
    getTrophies() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('***ZoneRepository getTrophies');
            const [result] = yield this._connection.query(`
                SELECT
                    zones.id,
                    zones.color,
                    zones.trophies,
                    zones.description,
                    terrain.level as zone_level,
                    terrain.sectors as zone_sectors,
                    rc.level as rank_level,
                    rc.exp as rank_exp,
                    p.icon,
                    p.name,
                    c.sectorId,
                    c.latlng,
                    vk.user_id as vk_id
                FROM
                    zones

                LEFT JOIN terrain ON terrain.zone_id = zones.id
                LEFT JOIN rank_conquests as rc ON rc.zone_id = zones.id
                LEFT JOIN pointers as p ON p.zone_id = zones.id
                LEFT JOIN citadels as c ON c.zone_id = zones.id
                LEFT JOIN vk_users as vk ON vk.zone_id = zones.id

                ORDER BY zones.trophies DESC
                LIMIT 20;
            `);
            if (!result) {
                throw new Error('----------');
            }
            const zones = result.map(zone => (Object.assign({}, zone)));
            console.log('ZoneRepository getTrophies zones', zones);
            return zones;
        });
    }
    update(zone) {
        return __awaiter(this, void 0, void 0, function* () {
            const dtoZone = zone.unmarshal();
            console.log('update dtoZone.hold.items', dtoZone.hold.items);
            const updated = yield this._connection.execute(`
            UPDATE
                zones,
                terrain,
                stormtrooper_corps,
                rank_conquests,
                hold
            SET
                zones.color = ?,
                zones.description = ?,
                
                zones.trophies = ?,
                zones.coins = ?,
                zones.rubies = ?,

                terrain.level = ?,
                terrain.sectors = ?,
                terrain.defenders = ?,

                stormtrooper_corps.level = ?,
                stormtrooper_corps.invaders = ?,
                stormtrooper_corps.power = ?,

                rank_conquests.level = ?,
                rank_conquests.exp = ?,

                hold.level = ?,
                hold.items = ?

            WHERE
                zones.id = ? and
                terrain.zone_id = ? and
                stormtrooper_corps.zone_id = ? and
                rank_conquests.zone_id = ? and
                hold.zone_id = ?

        `, [
                dtoZone.color,
                dtoZone.description,
                dtoZone.trophies,
                dtoZone.coins,
                dtoZone.rubies,
                dtoZone.terrain.level,
                dtoZone.terrain.sectors,
                dtoZone.terrain.defenders,
                dtoZone.stormtrooper_corps.level,
                dtoZone.stormtrooper_corps.invaders,
                dtoZone.stormtrooper_corps.power,
                dtoZone.rank.rank,
                dtoZone.rank.exp,
                dtoZone.hold.level,
                JSON.stringify(dtoZone.hold.items),
                zone.id,
                zone.id,
                zone.id,
                zone.id,
                zone.id
            ]);
            return zone_1.ZoneMapper.toDomain(dtoZone);
        });
    }
};
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.connection),
    __metadata("design:type", Object)
], ZoneRepository.prototype, "_connection", void 0);
ZoneRepository = __decorate([
    (0, inversify_1.injectable)()
], ZoneRepository);
exports.ZoneRepository = ZoneRepository;
