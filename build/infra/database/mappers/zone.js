"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZoneMapper = void 0;
const extraction_1 = require("../../../entities/zone/extraction");
const rank_1 = require("../../../entities/zone/rank");
const stormtrooper_corps_1 = require("../../../entities/zone/stormtrooper_corps");
const terrain_1 = require("../../../entities/zone/terrain");
const zone_1 = require("../../../entities/zone/zone");
class ZoneMapper {
    static toDomain(zone) {
        return zone_1.Zone.create({
            id: zone.id,
            terrain: new terrain_1.Terrain({
                level: zone.terrain.level,
                sectors: zone.terrain.sectors,
                defenders: zone.terrain.defenders
            }),
            rank: new rank_1.Rank({
                rank: zone.rank.rank,
                exp: zone.rank.exp,
                tempExp: zone.rank.tempExp
            }),
            stormtrooper_corps: new stormtrooper_corps_1.StormtrooperCorps({
                level: zone.stormtrooper_corps.level,
                power: zone.stormtrooper_corps.power,
                invaders: zone.stormtrooper_corps.invaders,
            }),
            hold: new extraction_1.Extraction({
                level: zone.hold.level,
                items: zone.hold.items
            }),
            color: zone.color,
            description: zone.description,
            trophies: zone.trophies,
            coins: zone.coins,
            rubies: zone.rubies,
        });
    }
}
exports.ZoneMapper = ZoneMapper;
