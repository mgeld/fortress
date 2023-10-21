import { injectable, inject } from 'inversify'
import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise'
import { TYPES } from '../../../../types'
import { IZoneRepository } from '../../../../entities/repository'
import { Zone } from '../../../../entities/zone/zone'
import { ZoneMapper } from '../../mappers/zone'

interface IZoneRowData {
    id?: number

    trophies?: number

    color?: number

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
                    zones.trophies,
                    zones.coins,
                    zones.rubies,

                    zones.extraction,

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
                LEFT JOIN terrain ON terrain.zone_id = zones.zone_id
                LEFT JOIN stormtrooper_corps AS storm ON storm.zone_id = zones.zone_id
                LEFT JOIN rank_conquests as rc ON rc.zone_id = zones.zone_id
                WHERE zones.id = ?;
            `, [_id]
        )
        if (!result) {
            throw new Error('----------')
        }

        const {
            id,
            color,

            trophies,
            coins,
            rubies,

            extraction,

            zone_level,
            zone_sectors,
            zone_defenders,

            storm_level,
            power,
            // storm_exp,
            invaders,

            // guard_level,
            // guard_exp,
            // defenders,

            rank_level,
            rank_exp
        } = result

        return ZoneMapper.toDomain({
            id,
            color,

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
            // guard_corps: {
            //     // level: guard_level,
            //     // exp: guard_exp,
            //     defenders
            // },
            stormtrooper_corps: {
                level: storm_level,
                power,
                // exp: storm_exp,
                invaders
            },
            extraction,
        })
    }

    // async getZoneByIds(_ids: number[]): Promise<TZone[]> {

    //     const [result] = await this._connection.query<TZone[] & RowDataPacket[]>(
    //         `SELECT
    //             id as zone_id,
    //             name,
    //             color
    //         FROM
    //             pointers
    //         WHERE
    //             id IN (?);`,
    //         [_ids]
    //     )

    //     console.log('getColorsByIds _ids.join(',')', _ids.join(','))
    //     console.log('getColorsByIds result', result)
    //     if (!result) {
    //         throw new Error('----------')
    //     }

    //     console.log('getColorsByIds result', result)

    //     return result.map(pointer => ({
    //         zone_id: pointer.zone_id,
    //         name: pointer.name,
    //         color: pointer.color
    //     }))

    // }

    // async getByIds(_ids: number[]): Promise<Zone[]> {
    //     const [result] = await this._connection.query<Required<IZoneRowData>[] & RowDataPacket[]>(
    //         `SELECT * FROM zones WHERE id IN (?);`, [_ids]
    //     )
    //     if (!result) {
    //         throw new Error('----------')
    //     }

    //     return result.map(zone => {
    //         const {
    //             id,
    //             color,
    //             trophies,
    //             coins,
    //             rubies,
    //             extraction,

    //             zone_level,
    //             zone_sectors,

    //             storm_level,
    //             invaders,

    //             guard_level,
    //             defenders,

    //             rank,
    //             exp
    //         } = zone

    //         return ZoneMapper.toDomain({
    //             id,

    //             // sectors,
    //             trophies,

    //             color,

    //             coins,
    //             rubies,
    //         })
    //     })

    // }

    async insert(zone: Zone): Promise<Zone> {
        const dtoZone = zone.unmarshal()

        const addZone = await this._connection.query<ResultSetHeader>(`
            INSERT INTO zones(
                color,
                trophies,
                coins,
                rubies,
                extraction
            )VALUES(
                ?,
                ?,
                ?,
                ?,
                ?
            );
        `, [
            dtoZone.color,
            dtoZone.trophies,
            dtoZone.coins,
            dtoZone.rubies,
            JSON.stringify(dtoZone.extraction)
        ])

        const zoneId = addZone[0].insertId
        console.log('INSERT ID???', zoneId)

        const inserted = await this._connection.query(`
            INSERT INTO terrain(zone_id,level,sectors,defenders)VALUES(?,?,?,?);
            INSERT INTO stormtrooper_corps(zone_id,level,invaders,power)VALUES(?,?,?,?);
            INSERT INTO rank_conquests(zone_id,level,exp)VALUES(?,?,?);
        `, [
            zoneId,
            dtoZone.terrain.level,
            dtoZone.terrain.sectors,
            dtoZone.terrain.defenders,

            zoneId,
            dtoZone.stormtrooper_corps.level,
            dtoZone.stormtrooper_corps.invaders,
            dtoZone.stormtrooper_corps.power,
            // dtoZone.stormtrooper_corps.exp,

            // zoneId,
            // dtoZone.guard_corps.level,
            // dtoZone.guard_corps.exp,
            // dtoZone.guard_corps.defenders,

            zoneId,
            dtoZone.rank.rank,
            dtoZone.rank.exp
        ])

        zone.id = zoneId

        return zone
    }

    async update(zone: Zone): Promise<Zone> {
        const dtoZone = zone.unmarshal()

        const updated = await this._connection.execute(`
            UPDATE
                zones,
                terrain,
                stormtrooper_corps,
                rank_conquests
                -- guard_corps,
            SET
                zones.color = ?,
                
                zones.trophies = ?,
                zones.coins = ?,
                zones.rubies = ?,

                zones.extraction = ?,

                terrain.level = ?,
                terrain.sectors = ?,
                terrain.defenders = ?,

                stormtrooper_corps.level = ?,
                stormtrooper_corps.invaders = ?,
                stormtrooper_corps.power = ?,

                rank_conquests.level = ?,
                rank_conquests.exp = ?

            WHERE
                zones.id = ? and
                terrain.zone_id = ? and
                stormtrooper_corps.zone_id = ? and
                rank_conquests.zone_id = ?

        `, [
            dtoZone.color,

            dtoZone.trophies,
            dtoZone.coins,
            dtoZone.rubies,

            dtoZone.extraction,

            dtoZone.terrain.level,
            dtoZone.terrain.sectors,
            dtoZone.terrain.defenders,

            dtoZone.stormtrooper_corps.level,
            dtoZone.stormtrooper_corps.invaders,
            dtoZone.stormtrooper_corps.power,

            // dtoZone.stormtrooper_corps.exp,

            // dtoZone.guard_corps.level,
            // dtoZone.guard_corps.exp,
            // dtoZone.guard_corps.defenders,

            dtoZone.rank.rank,
            dtoZone.rank.exp,

            zone.id,
            zone.id,
            zone.id,
            zone.id
            // zone.id,
        ])

        return ZoneMapper.toDomain(dtoZone)
    }

    async delete(userId: number): Promise<Boolean> {
        try {
            const updated = await this._connection.execute(`DELETE FROM zones id = ?`, [userId])
            return true
        } catch (e) {
            return false
        }
    }

}
