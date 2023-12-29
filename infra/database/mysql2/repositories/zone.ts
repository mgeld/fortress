import { injectable, inject } from 'inversify'
import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise'
import { TYPES } from '../../../../types'
import { IZoneRepository } from '../../../../entities/repository'
import { Zone } from '../../../../entities/zone/zone'
import { ZoneMapper } from '../../mappers/zone'
import { IRatingZone, TZoneColor } from '../../../../common-types/model'

interface IZoneRowData {
    id?: number

    trophies?: number

    color?: TZoneColor
    description?: string

    coins?: number
    rubies?: number
}

@injectable()
export class ZoneRepository implements IZoneRepository {

    @inject(TYPES.connection) private _connection!: Pool

    async getById(_id: number): Promise<Zone> {

        const [[result]] = await this._connection.query<Required<IZoneRowData>[] & RowDataPacket[]>(
            `
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
            `, [_id]
        )
        if (!result) {
            throw new Error('----------')
        }

        const {
            id,
            color,
            description,

            trophies,
            coins,
            rubies,

            hold_level,
            hold_items,

            zone_level,
            zone_sectors,
            zone_defenders,

            storm_level,
            power,
            invaders,

            rank_level,
            rank_exp
        } = result

        return ZoneMapper.toDomain({
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
        })
    }

    async insert(zone: Zone): Promise<Zone> {
        const dtoZone = zone.unmarshal()

        const addZone = await this._connection.query<ResultSetHeader>(`
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
        ])

        const zoneId = addZone[0].insertId

        const inserted = await this._connection.query(`
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
        ])

        zone.id = zoneId

        return zone
    }

    async getTrophies(): Promise<IRatingZone[]> {

        const [result] = await this._connection.query<Required<IRatingZone>[] & RowDataPacket[]>(
            `
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
            `
        )

        if (!result) {
            throw new Error('----------')
        }

        const zones = result.map(zone => ({ ...zone }))

        return zones
    }


    async getZone(id: number): Promise<IRatingZone> {

        const [[result]] = await this._connection.query<Required<IRatingZone>[] & RowDataPacket[]>(
            `
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

                WHERE zones.id = ?
            `, [id]
        )

        if (!result) {
            throw new Error('----------')
        }

        return result
    }


    async update(zone: Zone): Promise<Zone> {
        const dtoZone = zone.unmarshal()

        const updated = await this._connection.execute(`
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
        ])

        return ZoneMapper.toDomain(dtoZone)
    }

}
