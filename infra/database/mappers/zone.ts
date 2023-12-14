import { Extraction } from '../../../entities/zone/extraction'
import { GuardCorps } from '../../../entities/zone/guard_corps'
import { Rank } from '../../../entities/zone/rank'
import { StormtrooperCorps } from '../../../entities/zone/stormtrooper_corps'
import { Terrain } from '../../../entities/zone/terrain'
import { UnmarshalledZone, Zone } from '../../../entities/zone/zone'

export class ZoneMapper {
    public static toDomain(zone: UnmarshalledZone): Zone {
        return Zone.create({
            id: zone.id,

            // zoneId: zone.zoneId,

            terrain: new Terrain({
                level: zone.terrain.level,
                sectors: zone.terrain.sectors,
                defenders: zone.terrain.defenders
            }),

            rank: new Rank({
                rank: zone.rank.rank,
                exp: zone.rank.exp,
                tempExp: zone.rank.tempExp
            }),

            stormtrooper_corps: new StormtrooperCorps({
                level: zone.stormtrooper_corps.level,
                // exp: zone.stormtrooper_corps.exp,
                power: zone.stormtrooper_corps.power,
                invaders: zone.stormtrooper_corps.invaders,
            }),

            // guard_corps: new GuardCorps({
            //     // level: zone.guard_corps.level,
            //     // exp: zone.stormtrooper_corps.exp,
            //     defenders: zone.guard_corps.defenders
            // }),

            hold: new Extraction({
                level: zone.hold.level,
                items: zone.hold.items
            }),

            // extraction: new Extraction({
            //     list: zone.extraction
            // }),

            color: zone.color,
            description: zone.description,

            trophies: zone.trophies,

            coins: zone.coins,
            rubies: zone.rubies,
        })
    }
}
