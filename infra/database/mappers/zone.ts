import { UnmarshalledZone, Zone } from '../../../entities/zone/zone'

export class ZoneMapper {
    public static toDomain(zone: UnmarshalledZone): Zone {
        return Zone.create({
            id: zone.id,

            sectors: zone.sectors,
            trophies: zone.trophies,

            color: zone.color,

            coins: zone.coins,
            rubies: zone.rubies,
        })
    }
}
